import Navbar from './components/NavBar/Navbar';
import Main from './components/Main/Main';
import { fetchData } from './utils/fetchData';
import { useState, useEffect, createContext, useRef } from 'react';
import './App.css';
import { delay } from 'framer-motion';

//Creation of context to manage states globally
export const GlobalContext = createContext();
export const MainContext = createContext();

//Custom hook
const useStorageState = (localStorageKey, initialState, type) => {
  const [value, setValue] = useState(type === 'var' ? localStorage.getItem(localStorageKey) : JSON.parse(localStorage.getItem(localStorageKey))  || initialState);
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, type === 'var' ? value : JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

const App = () => {
  const [theme, setTheme] = useStorageState('theme', 'light', 'var');
  const [language, setLanguage] = useStorageState('lang', {id: 'en', locale: 'en-US'}, 'object');
  const [unit, setUnit] = useStorageState('unit', 'C', 'var');
  const searchTerm = useRef(null);
  const [forecastType, setForecastType] = useState('today');
  const [data, setData] = useState({});
  const [firstAnimation, setFirstAnimation] = useState(true);
  let date = new Date();

  //It does the same thing of window.onLoad
  useEffect(() => {
    if(!localStorage.getItem('theme'))
      localStorage.setItem('theme', 'light');
  
    if(!localStorage.getItem('lang'))
      localStorage.setItem('lang', 'en');
  
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
  }, []);


  const themeHandle = (e) => {
    if(theme === e.target.id)
      return;

    setTheme(e.target.id);
    document.body.setAttribute('data-theme', e.target.id);
  }

  const languageHandle = (e) => {
    if(language === e.target.id)
      return;

    setLanguage({id: e.target.id, locale: e.target.attributes.locale.value});
  }

  const unitHandle = (e) => {
    if(unit === e.target.id)
      return;

    setUnit(e.target.id);
  }

  const searchDataHandle = async (city, firstAnim, unitLang) => {
    const dt = await fetchData({city, unit, language, data, unitLang});
    setData(dt);

    if(!unitLang){
      setFirstAnimation(firstAnim);
      //setTimeout(setMainKey(prevKey => prevKey + 1), 3000);
      setForecastType('today');
    }
  }

  useEffect(() => {
    if(searchTerm.current.value === "" && Object.keys(data).length === 0)
      return;
    else if(searchTerm.current.value === "" && Object.keys(data).length !== 0){
      searchDataHandle(document.querySelector('.city').innerText, false, true);
      return;
    }
    
    searchDataHandle(document.querySelector('.city').innerText, false, true);
  }, [unit, language])

  return (
    <>
      <GlobalContext.Provider 
        value={
          {
            theme: {theme, themeHandle}, 
            language: {language, languageHandle},
            unit: {unit, unitHandle},
            searchTerm,
            searchDataHandle
          }
        }
      >
        <Navbar />
      </GlobalContext.Provider>

      {/* key={mainKey} serve per far ri-renderizzare il main ad ogni ricerca */}
      <MainContext.Provider value={{ data, date, theme, language: language.locale, unit, forecastType: {forecastType, setForecastType}, firstAnimation: {firstAnimation, setFirstAnimation}}}>
        {Object.keys(data).length !== 0 && (<Main/>)}
      </MainContext.Provider>
    </>
  )
}

export default App