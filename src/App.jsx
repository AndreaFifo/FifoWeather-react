import Navbar from './components/NavBar/Navbar';
import Main from './components/Main/Main';
import { fetchData } from './utils/fetchData';
import { useState, useEffect, createContext} from 'react';
import './App.css';

//Creation of context to manage states globally
export const GlobalContext = createContext();
export const MainContext = createContext();

//Custom hook
const useStorageState = (localStorageKey, initialState, type) => {
  let storedValue = localStorage.getItem(localStorageKey);
  let finalValue;
  if(!storedValue){
    localStorage.setItem(localStorageKey, type === 'var' ? initialState : JSON.stringify(initialState));
    finalValue = initialState;
  }
  else
    finalValue = type === 'var' ? storedValue : JSON.parse(storedValue);

  const [value, setValue] = useState(finalValue);
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, type === 'var' ? value : JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

const App = () => {
  const [theme, setTheme] = useStorageState('theme', 'light', 'var');
  const [language, setLanguage] = useStorageState('lang', {id: 'en', locale: 'en-US'}, 'object');
  const [unit, setUnit] = useStorageState('unit', 'C', 'var');
  const [forecastType, setForecastType] = useState('today');
  const [data, setData] = useState({});
  const [firstAnimation, setFirstAnimation] = useState(true);
  const [loading, setLoading] = useState(true);
  //It does the same thing of window.onLoad
  useEffect(() => {
  
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

  const searchDataHandle = async (city, firstAnim, unitLang, latitude=null, longitude=null, countryCode=null, region=null) => {
    const dt = await fetchData({city, unit, language, data, unitLang, latitude, longitude, countryCode, region});
    setData(dt);

    if(!unitLang){
      setFirstAnimation(firstAnim);
      setForecastType('today');
    }

  }

  useEffect(() => {
    if(Object.keys(data).length === 0)
      return;
    else if(Object.keys(data).length !== 0){
      searchDataHandle(data.city, false, true, data.lat, data.lon, data.country, data.region);
      return;
    }
  }, [unit, language])
  
  return (
    <>
      <GlobalContext.Provider 
        value={
          {
            theme: {theme, themeHandle}, 
            language: {language, languageHandle},
            unit: {unit, unitHandle},
            searchDataHandle
          }
        }
      >
        <Navbar />
      </GlobalContext.Provider>

      <MainContext.Provider value={{ data, theme, language, unit, forecastType: {forecastType, setForecastType}, firstAnimation: {firstAnimation, setFirstAnimation}}}>
        {Object.keys(data).length !== 0 && (<Main/>)}
      </MainContext.Provider>
    </>
  )
}

export default App