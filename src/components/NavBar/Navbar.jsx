import { useState } from 'react';
import { Sun, Moon, Globe } from 'react-feather';
import { italy, uk, spain } from '../../assets';
import './navbar.css';

const Navbar = ({language, theme, unit}) => {
    const [sideMenu, setSideMenu] = useState(false);

    const handleSideMenu = (e) => {
        e.currentTarget.classList.toggle('open')

        setSideMenu(!sideMenu);
    }

    return (
        <nav>
            <h1 className='logo'>FifoWeather</h1>

            <div className="hamburger" onClick={handleSideMenu}>
                <div className="line" />
            </div>

            <div className={sideMenu ? "settings show" : "settings"}>
                <div className="theme-slider">
                    <Sun size={24} id='light' className={theme.theme == 'light' ? 'btn selected' : 'btn'} onClick={theme.handle}/>
                    <Moon size={24} id='dark' className={theme.theme == 'dark' ? 'btn selected' : 'btn'} onClick={theme.handle}/>
                    <div className="slider" style={{transform: theme.theme == 'light' ? 'translate(0, -5px)' : 'translate(100%, -5px)'}}/>
                </div>

                <div className="language-part">
                    <Globe size={24} className="language"/>
                    
                    <ul className="language-dropdown">
                        <li onClick={language.handle} id='it' className={language.language == 'it' ? 'selected' : ''}>
                            <img src={italy} alt="italy lang" />
                            <p>Italian</p>
                        </li>
                        <li onClick={language.handle} id='en' className={language.language == 'en' ? 'selected' : ''}>
                            <img src={uk} alt="english lang"/>
                            <p>English</p>
                        </li>
                        <li onClick={language.handle} id='sp' className={language.language == 'sp' ? 'selected' : ''}>
                            <img src={spain} alt="spain lang"/>
                            <p>Spain</p>
                        </li>
                    </ul>
                </div>

                <div className="units">
                    <p className={unit.unit == 'c' ? 'selected' : ''} id='c' onClick={unit.handle}>C</p>
                        |
                    <p className={unit.unit == 'f' ? 'selected' : ''} id='f' onClick={unit.handle}>F</p>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;