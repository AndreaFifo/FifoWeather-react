import { Wind, Droplet, CornerRightDown, Key } from "react-feather";
import { MainContext } from "../../../App";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { capitalizeString, weatherImg } from "../../../utils/weatherIcon";
import { languages, weatherTranslate } from "../../../utils/dictionary";

const GeneralInfo = () => {
    const {data, date, language, unit} = useContext(MainContext);

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
        <AnimatePresence>
            <motion.div className="general-info" key={data.id}
                initial={{x: -40, opacity: 0}}
                animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.8, delay: 0.3}}}
                exit={{x: -40, opacity: 0, transition: {ease: 'easeInOut', duration: 0.5}}}
            >
                <div className="header">
                    <div className="city-date">
                        <motion.p className="day"
                            initial={{x: -10, opacity: 0}}
                            animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.6}}}
                        >
                            {languages[language.id].generalData.day} {date.getDate() + ' ' + capitalizeString(date.toLocaleString(language.id, { month: 'long' }))}
                        </motion.p>
                        <motion.p className="city"
                            initial={{x: -10, opacity: 0}}
                            animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.8}}}
                        >   
                            {data.city}
                            <small>({data.region}, {data.country})</small>
                        </motion.p>
                    </div>

                    <motion.p className="temp"
                        initial={{x: 10, opacity: 0}}
                        animate={{x: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 0.8}}}
                    >
                        {Math.round(data.data.current.temp)}{unit === 'C' ? '°C' : '°F'}
                    </motion.p>
                </div>

                <div className="weather">
                    <motion.img src={weatherImg(data.data.current.weather[0].icon, date.getHours())} alt="current weather"
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {ease: 'easeInOut', duration: 0.7, delay: 1}}}
                    />
                    
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
                        <Wind size={22}/>
                        <h4>{data.data.current.wind_speed} {unit === 'C' ? 'm/s' : 'mph'}</h4>
                        <p>{languages[language.id].generalData.otherInfo['wind']}</p>
                    </motion.div>
                    <motion.div className="humidity" variants={variantListItem}>
                        <Droplet size={22}/>
                        <h4>{data.data.current.humidity}%</h4>
                        <p>{languages[language.id].generalData.otherInfo['humidity']}</p>
                    </motion.div>
                    <motion.div className="pressure" variants={variantListItem}>
                        <CornerRightDown size={22}/>
                        <h4>{data.data.current.pressure} hPa</h4>
                        <p>{languages[language.id].generalData.otherInfo['pressure']}</p> 
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}

export default GeneralInfo