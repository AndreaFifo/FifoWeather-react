import { Wind, Droplet, CornerRightDown} from "react-feather";
import { GlobalContext, MainContext } from "../../../App";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capitalizeString, weatherImg } from "../../../utils/weatherIcon";
import { languages, weatherTranslate } from "../../../utils/dictionary";
import { changeTimeZone } from "../../../utils/fetchData";

export const GeneralInfo = () => {
    const {data} = useContext(MainContext);
    const {language: {language}, unit: {unit}} = useContext(GlobalContext);

    let date = changeTimeZone(new Date(), data.data.timezone);

    const variantList = {
        hidden: {
            y: '100%', 
            opacity: 0
        },
        visible: {
            opacity: 1, 
            y: 0, 
            transition: {
                ease: 'easeInOut', 
                duration: 0.9, 
                delay: 1.8,
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        }
    }

    const variantListItem = {
        hidden: {
            y: '100%', 
            opacity: 0
        },
        visible: {
            y: 0, 
            opacity: 1, 
            transition: {
                ease: 'easeInOut', 
                duration: 0.5,
            },
        }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className="general-info" key={data.id}
                initial={{x: -40, opacity: 0}}
                animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.8}}}
                exit={{x: -40, opacity: 0, transition: {ease: 'easeInOut', duration: 0.7}}}
            >
                <div className="header">
                    <div className="city-date">
                        <motion.p className="day"
                            initial={{x: -10, opacity: 0}}
                            animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.6}}}
                        >
                            {languages[language.id].generalData.day} {date.getDate() + ' ' + capitalizeString(date.toLocaleString(language.id, { month: 'long' }))}
                        </motion.p>
                        <motion.div className="city"
                            initial={{x: -10, opacity: 0}}
                            animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.8}}}
                        >   
                            <p>{data.city}</p>
                            <small>({data.region}, {data.country})</small>
                        </motion.div>
                    </div>

                    <motion.p className="temp"
                        initial={{x: 10, opacity: 0}}
                        animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.8}}}
                    >
                        {Math.round(data.data.current.temp)}{unit === 'C' ? '°C' : '°F'}
                    </motion.p>
                </div>

                <div className="weather">
                    <picture>
                        <motion.img src={weatherImg(data.data.current.weather[0].icon, date.getHours())} alt="current weather"
                            initial={{opacity: 0}}
                            animate={{opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 1}}}
                        />
                    </picture>
                    
                    
                    <div className="text">
                        <motion.h2 
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0, transition: {ease: 'easeInOut', duration: 0.7, delay: 1.4}}}
                        >
                            {weatherTranslate[language.id][data.data.current.weather[0].main]}
                        </motion.h2>
                        <motion.h3
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0, transition: {ease: 'easeInOut', duration: 0.7, delay: 1.4}}}
                        >
                            {data.data.current.weather[0].description}
                        </motion.h3>
                    </div>
                </div>

                <motion.div className="other-info"
                    variants={variantList}
                    initial={"hidden"}
                    animate={"visible"}
                >
                    <motion.div className="wind" variants={variantListItem}>
                        <picture><Wind size={22}/></picture>
                        <h4>{data.data.current.wind_speed} {unit === 'C' ? 'm/s' : 'mph'}</h4>
                        <p>{languages[language.id].generalData.otherInfo['wind']}</p>
                    </motion.div>
                    <motion.div className="humidity" variants={variantListItem}>
                        <picture><Droplet size={22}/></picture>
                        <h4>{data.data.current.humidity}%</h4>
                        <p>{languages[language.id].generalData.otherInfo['humidity']}</p>
                    </motion.div>
                    <motion.div className="pressure" variants={variantListItem}>
                        <picture><CornerRightDown size={22}/></picture>
                        <h4>{data.data.current.pressure} hPa</h4>
                        <p>{languages[language.id].generalData.otherInfo['pressure']}</p> 
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default GeneralInfo