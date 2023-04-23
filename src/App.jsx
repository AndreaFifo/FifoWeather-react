import React from 'react';
import Navbar from './components/NavBar/Navbar';
import { useState, useEffect } from 'react';
import './App.css';

window.addEventListener('load', () => {
  if(!localStorage.getItem('theme'))
    localStorage.setItem('theme', 'light');

  if(!localStorage.getItem('lang'))
    localStorage.setItem('lang', 'en');

  document.body.setAttribute('data-theme', localStorage.getItem('theme'));
})

//Custom hook
const useStorageState = (localStorageKey, initialState) => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || initialState);

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
}

const App = () => {
  const [theme, setTheme] = useStorageState('theme', 'light');
  const [language, setLanguage] = useStorageState('lang', 'en');
  const [unit, setUnit] = useStorageState('unit', 'c');

  const themeHandle = (e) => {
    if(theme == e.target.id)
      return;

    setTheme(e.target.id);
    document.body.setAttribute('data-theme', e.target.id);
  }

  const languageHandle = (e) => {
    if(language == e.target.id)
      return;

    setLanguage(e.target.id);
  }

  const unitHandle = (e) => {
    if(unit == e.target.id)
      return;

    setUnit(e.target.id);
  }

  return (
    <>
      <Navbar 
        language={{language: language, handle: languageHandle}} 
        theme={{theme: theme, handle: themeHandle}}
        unit={{unit: unit, handle: unitHandle}}
      />
    </>
  )
}

export default App
