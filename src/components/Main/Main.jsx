import { useEffect, useContext, useState } from "react";
import { GlobalContext } from "../../App";
import { fetchData } from "../../utils/fetchData";
import { Wind, Droplet, CornerRightDown } from "react-feather";
import "./main.css"

const Main = () => {
  const [city, setCity] = useState('');
  const { searching, searchTerm, unit, language } = useContext(GlobalContext);
  const apiKey = import.meta.env.VITE_APIKEY;
  let weatherData = {};

  useEffect(() => {
    if(searchTerm.searchTerm === '' || !searching.searching)
      return;

    handleSearch();
    searching.setSearching(false);
  }, [searching.searching, unit.unit, language.language]);

  const handleSearch = async () => {
    weatherData = await fetchData({searching, searchTerm, unit, language, apiKey});
    setCity(weatherData.name);

    console.log(weatherData);
  }

  return (
    <main>
      <div className="general-info">
        <div className="header">
          <div className="city-date">
            <p className="day">Today, 1 May</p>
            <p className="city">{city}</p>
          </div>

          <p className="temp">20°</p>
        </div>

        <div className="weather">
          <h2>Raining</h2>
          <img src='' alt="aaaa"/>
        </div>

        <div className="other-info">
          <h3>Other information</h3>
          <div>
            <div className="wind">
              <Wind />
              <p>Wind</p>
              <p>20p</p>
            </div>
            <div className="humidity">
              <Droplet />
              <p>Humidity</p>
              <p>20p</p>
            </div>
            <div className="pressure">
              <CornerRightDown />
              <p>Pressure</p> 
              <p>20p</p>
            </div>
          </div>
        </div>
      </div>

      <div className="forecast-info">

      </div>
    </main>
  )
}

export default Main