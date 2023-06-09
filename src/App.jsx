import Navbar from './components/NavBar/Navbar';
import Main from './components/Main/Main';
import { useState, useEffect, createContext } from 'react';
import './App.css';

//Creation of context to manage states globally
export const GlobalContext = createContext();
//export const WeatherContext = createContext();

//Custom hook
const useStorageState = (localStorageKey, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || initialState);

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}

const App = () => {
  //It does the same thing of window.onLoad
  useEffect(() => {
    if(!localStorage.getItem('theme'))
      localStorage.setItem('theme', 'light');
  
    if(!localStorage.getItem('lang'))
      localStorage.setItem('lang', 'en_US');
  
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
  }, []);

  const [theme, setTheme] = useStorageState('theme', 'light');
  const [language, setLanguage] = useStorageState('lang', 'en_US');
  const [unit, setUnit] = useStorageState('unit', 'c');
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  const themeHandle = (e) => {
    if(theme === e.target.id)
      return;


    setTheme(e.target.id);
    document.body.setAttribute('data-theme', e.target.id);
  }

  const languageHandle = (e) => {
    if(language === e.target.id)
      return;

    setLanguage(e.target.id);
  }

  const unitHandle = (e) => {
    if(unit === e.target.id)
      return;

    setUnit(e.target.id);
  }

  const searchTermHandle = (value) => {
    setSearchTerm(value);
  }

  return (
    <>
      <GlobalContext.Provider 
        value={
          {
            theme: {theme, themeHandle}, 
            language: {language, languageHandle},
            unit: {unit, unitHandle},
            searchTerm: {searchTerm, searchTermHandle},
            searching: {searching, setSearching},
          }
        }
      >
        <Navbar />
        <Main />
      </GlobalContext.Provider>
    </>
  )
}

export default App