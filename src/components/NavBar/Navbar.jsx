import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ThemeSlider from './ThemeSlider/ThemeSlider';
import LanguageMenu from './LanguageMenu/LanguageMenu';
import Units from './Units/Units';
import './navbar.css';

const Navbar = () => {
    const [sideMenu, setSideMenu] = useState(false);

    const handleSideMenu = (e) => {
        e.currentTarget.classList.toggle('open')

        setSideMenu(!sideMenu);
    }

    return (
        <div className='nav-bar'>
            <nav>
                <h1 className='logo'>FifoWeather</h1>

                {window.innerWidth > 800 && (<Searchbar />)}

                <div className="hamburger" onClick={handleSideMenu}>
                    <div className="line" />
                </div>

                <div className={sideMenu ? "settings show-nav" : "settings"}>
                    <ThemeSlider />
                    <LanguageMenu />
                    <Units />
                </div>
            </nav>

            {window.innerWidth < 800 && (<Searchbar />)}
        </div>
    )
}

export default Navbar;