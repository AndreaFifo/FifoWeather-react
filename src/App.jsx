import Navbar from './components/NavBar/Navbar';
import Main from './components/Main/Main';
import { fetchData } from './utils/fetchData';
import { useState, useEffect, createContext, useSyncExternalStore } from 'react';
import './App.css';
import Error from './components/Main/Error/Error';

//Creation of context to manage states globally
export const GlobalContext = createContext();
export const MainContext = createContext();

//Custom hook
export const useStorageState = (localStorageKey, initialState, type) => {
  let storedValue = localStorage.getItem(localStorageKey);
  let finalValue = initialState;
  if(!storedValue)
    localStorage.setItem(localStorageKey, type === 'var' ? initialState : JSON.stringify(initialState));
  else
    finalValue = type === 'var' ? storedValue : JSON.parse(storedValue);

  const [value, setValue] = useState(finalValue);
  
  useEffect(() => {
    localStorage.setItem(localStorageKey, type === 'var' ? value : JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

const useOnlineStatus = () => {
  const isOnline = useSyncExternalStore(onlineOfflineSubscribe, getConnectionStatut);
  return isOnline;
}

function getConnectionStatut() {
  return navigator.onLine;
}

function onlineOfflineSubscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

const App = () => {
  const [theme, setTheme] = useStorageState('theme', 'light', 'var');
  const [language, setLanguage] = useStorageState('lang', {id: 'en', locale: 'en-US'}, 'object');
  const [unit, setUnit] = useStorageState('unit', 'C', 'var');
  const [forecastType, setForecastType] = useState('today');
  const [data, setData] = useState({});
  const [firstAnimation, setFirstAnimation] = useState(true);
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    !isOnline ? setCityNotFound(false) : null;
  });

  //It does the same thing of window.onLoad
  useEffect(() => {
    document.body.setAttribute('data-theme', localStorage.getItem('theme'));
    if(!localStorage.getItem('chronology'))
      localStorage.setItem('chronology', JSON.stringify([]));
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

    setSkeletonLoading(true);
    setLanguage({id: e.target.id, locale: e.target.attributes.locale.value});
  }

  const unitHandle = (e) => {
    if(unit === e.target.id)
      return;

    setSkeletonLoading(true);
    setUnit(e.target.id);
  }

  const searchDataHandle = async (city, firstAnim, unitLang, latitude=null, longitude=null, countryCode=null, region=null) => {
    const dt = await fetchData({city, unit, language, data, unitLang, latitude, longitude, countryCode, region, isOnline});
    if(dt !== 0){
      setData(dt);
      cityNotFound ? setCityNotFound(false) : null; 
    }
    else{
      setCityNotFound(true);
      return;
    }

    if(!unitLang){
      setFirstAnimation(firstAnim);
      setForecastType('today');
    }
    else
      setSkeletonLoading(false);
  }

  useEffect(() => {
    if(Object.keys(data).length === 0)
      return;
    else if(Object.keys(data).length !== 0){
      searchDataHandle(data.city, false, true, data.lat, data.lon, data.country, data.region);
      return;
    }
  }, [unit, language]);
  
  try{
    return (
      <>
        <GlobalContext.Provider 
          value={
            {
              theme: {theme, themeHandle}, 
              language: {language, languageHandle},
              unit: {unit, unitHandle},
              searchDataHandle,
              isOnline
            }
          }
        >
          <Navbar />
        </GlobalContext.Provider>

        <MainContext.Provider value={{ data, theme, language, unit, forecastType: {forecastType, setForecastType}, firstAnimation: {firstAnimation, setFirstAnimation}, skeletonLoading}}>
          {!isOnline && (<Error type="connection"/>)}
          {cityNotFound && (<Error type="cityNotFound"/>)}
          
          {(Object.keys(data).length !== 0 && !cityNotFound && isOnline) && (<Main/>)}
        </MainContext.Provider>
      </>
    )
  }
  catch(error){
    console.log(error);
  }
}

export default App