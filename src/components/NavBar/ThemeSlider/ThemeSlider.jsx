import { GlobalContext } from "../../../App";
import { Sun, Moon } from 'react-feather';
import { useContext } from "react";

const ThemeSlider = () => {
    const { theme } = useContext(GlobalContext);
    
    return (
        <div className="theme-slider">
            <Sun size={24} id='light' className={theme.theme === 'light' ? 'btn selected' : 'btn'} onClick={theme.themeHandle}/>
            <Moon size={24} id='dark' className={theme.theme === 'dark' ? 'btn selected' : 'btn'} onClick={theme.themeHandle}/>
            <div className="slider" style={{transform: theme.theme === 'light' ? 'translate(0, -5px)' : 'translate(100%, -5px)'}}/>
        </div>
    )
}

export default ThemeSlider