import { useState, useContext } from 'react';
import { Sun, Moon, Globe} from 'react-feather';
import { italy, uk, spain } from '../../assets';
import { Context } from '../../App';
import Searchbar from './Searchbar/Searchbar';
import './navbar.css';

const Navbar = () => {
    const [sideMenu, setSideMenu] = useState(false);

    const {theme, language, unit} = useContext(Context);

    const handleSideMenu = (e) => {
        e.currentTarget.classList.toggle('open')

        setSideMenu(!sideMenu);
    }

    const langs = [
        {id: 'en_US', locale: 'en_US', label: 'English', flag: uk},
        {id: 'it_IT', locale: 'it_IT', label: 'Italian', flag: italy},
        {id: 'es_ES', locale: 'es_ES', label: 'Spanish', flag: spain}
    ];

    return (
        <div className='nav-bar'>
            <nav>
                <h1 className='logo'>FifoWeather</h1>

                {window.innerWidth > 800 && (<Searchbar />)}

                <div className="hamburger" onClick={handleSideMenu}>
                    <div className="line" />
                </div>

                <div className={sideMenu ? "settings show" : "settings"}>
                    <div className="theme-slider">
                        <Sun size={24} id='light' className={theme.theme === 'light' ? 'btn selected' : 'btn'} onClick={theme.themeHandle}/>
                        <Moon size={24} id='dark' className={theme.theme === 'dark' ? 'btn selected' : 'btn'} onClick={theme.themeHandle}/>
                        <div className="slider" style={{transform: theme.theme === 'light' ? 'translate(0, -5px)' : 'translate(100%, -5px)'}}/>
                    </div>

                    <div className="language-part">
                        <Globe size={24} className="language"/>
                        
                        <ul className="language-dropdown">
                            {
                                langs.map(lang => 
                                    <li key={lang.id} id={lang.id} onClick={language.languageHandle} className={language.language === lang.id ? 'selected' : ''}>
                                        <img src={lang.flag} alt={lang.label} />
                                        <p>{lang.label}</p>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="units">
                        <p className={unit.unit === 'c' ? 'selected' : ''} id='c' onClick={unit.unitHandle}>C</p>
                            |
                        <p className={unit.unit === 'f' ? 'selected' : ''} id='f' onClick={unit.unitHandle}>F</p>
                    </div>
                </div>
            </nav>

            {window.innerWidth < 800 && (<Searchbar />)}
        </div>
    )
}

export default Navbar;

//fsq3ss1C9OUVrKEIvzaZsW2xurYYAdce4rituxeIdUJQvtc=