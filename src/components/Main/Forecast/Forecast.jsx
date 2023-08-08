import { capitalizeString, weatherImg } from '../../../utils/weatherIcon';
import { useContext, useEffect, useRef } from 'react';
import { MainContext } from '../../../App';
import { motion, AnimatePresence } from "framer-motion";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Forecast = () => {
  const splide = useRef();

  const {data, date, unit, language, firstAnimation: {firstAnimation}, forecastType: {forecastType, setForecastType}} = useContext(MainContext);
  const arrayData = forecastType === 'today' ? Object.entries(data.data.hourly) : Object.entries(data.data.daily);

  useEffect(() => {
    splide.current.go(0);
  }, [forecastType]);
  
  
  let forecastDate = new Date();
  return (
    <AnimatePresence>
      <motion.div className="forecast" key={data.id}
        exit={{x: 40, opacity: 0, transition: {ease: 'easeInOut', duration: 0.5}}}
      >
        <motion.div className="types"
          initial={{opacity: 0}}
          animate={{opacity: 1, transition: {ease: 'easeInOut', duration: 0.5, delay: 5.2}}}
        >
          <p className={forecastType === 'today' ? 'type selected' : 'type'} onClick={() => {forecastType !== 'today' ? setForecastType('today') : ''}}>Today</p>
          <p className={forecastType === 'week' ? 'type selected' : 'type'} onClick={() => {forecastType !== 'week' ? setForecastType('week') : ''}}>Week</p>
          <div className="line" style={{transform: forecastType === 'today' ? 'translate(calc(-100% + 10px), 12px)' : 'translate(calc(100% - 10px), 12px)'}}></div>
        </motion.div>

        <Splide ref={(slider) => (splide.current = slider)}
          options={{
            gap: 30,
            pagination: false,
            arrows: false,
            drag: true,
            perMove: 1,
            focus: 'right',
            breakpoints: {
              400: {
                perPage: 2,
                perMove: 2,
              },
              550: {
                perPage: 3,
                perMove: 3,
              },
              700: {
                perPage: 4,
                perMove: 4,
              },
              1260: {
                perPage: 4,
                perMove: 4,
              },
              2000: {
                perPage: 5,
                perMove: 5,
              },
            }
          }}>
            {arrayData.map((e, i) => {
              if(i <= (23 - date.getHours()) && forecastType === 'today')
                return(
                  <SplideSlide key={i}>
                    <DivForecast data={e} date={date} index={i} unit={unit} forecastType={forecastType} lang={null} firstAnimation={firstAnimation}/>
                  </SplideSlide>
                );
              else if(i < 6 && forecastType === 'week'){
                return(
                  <SplideSlide key={i}>
                    <DivForecast data={e} date={forecastDate} index={i} unit={unit} forecastType={forecastType} lang={language} firstAnimation={firstAnimation}/>
                  </SplideSlide>
                );
              }
            })}
        </Splide>
      </motion.div>
    </AnimatePresence>
  )
}

export default Forecast

const DivForecast = ({data, date, index, unit, forecastType, lang, firstAnimation}) => {
  if(forecastType === 'week'){
    date.setDate(date.getDate() + 1)
  }

  return(
    <motion.div
      key={forecastType}
      initial={{y: -20, opacity: 0}}
      animate={{y: 0, opacity: 1, transition: {duration: 0.5, ease: 'easeInOut', delay: (0.3 * index) + (firstAnimation ? 3.8 : 0)}}}
    >
      {forecastType === 'today' && (<p className="hour">{date.getHours() + index}:00</p>)}
      {forecastType === 'week' && (<p className="hour">{capitalizeString(date.toLocaleString(lang, { weekday: window.innerWidth <= 350 ? 'narrow' : 'short' })) + ' ' + date.getDate()}</p>)}

      <img src={weatherImg(data[1].weather[0].icon, forecastType === 'day' ? date.getHours() : 7)} alt="icon" loading='lazy'/>

      <div className="bottom-text">
        <h2 className="temp">{Math.round(typeof data[1].temp === 'number' ? data[1].temp : avgArray(Object.values(data[1].temp))) + '°' +unit}</h2> 
        <h3 className="weather">{data[1].weather[0].main}</h3>
      </div>
    </motion.div>
  )
}

function avgArray(array){
  let sum = 0;
  for(let i = 0; i < array.length; i++)
    sum += array[i];

  return sum / array.length
}