import { Wifi, MapPin } from "react-feather";
import { motion } from "framer-motion";


const Error = ({ type }) => {
    const errors = {
        connection: {
            text: "Please check your internet connection and try again.",
            icon: () => <Wifi className="error-icon"/>
        },
        cityNotFound: {
            text: "The city you were looking for doesn't seem to exist. Try again.",
            icon: () => <MapPin className="error-icon"/>
        }
    }

    return (
        <div className="error">
            <motion.div className="error-container"
                initial={{y: 10, opacity: 0}}
                animate={{y: 0, opacity: 1, transition: {ease: 'easeInOut', duration: 1}}}
            >
                {errors[type].icon()}

                <div className="white-container">
                    <h1>Oops...</h1>
                    <p>{errors[type].text}</p>
                </div>
            </motion.div>  
        </div>  
    )
}

export default Error