import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '../../../App';
import { Search, X, MapPin, Trash2 } from 'react-feather';
import { languages } from "../../../utils/dictionary";
import { fetchCities, addNewSearchedCity } from "../../../utils/fetchData";

document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown-search');
    const searchInput = document.querySelector('#search');
    const x = document.querySelector('.btn.del');
    const searchIcon = document.querySelector('.btn.search');
    if (!dropdown.contains(event.target) && !searchInput.contains(event.target) && !x.contains(event.target) && !searchIcon.contains(event.target)) {
        dropdown.classList.remove('open');
    }
});

const Searchbar = () => {
    const { searchDataHandle, language: {language} } = useContext(GlobalContext);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    async function getCities(searchTerm){
        setIsLoading(true);
        if(searchTerm === '') 
            return;
    
        const citiesList = await fetchCities(searchTerm);
        setCities(citiesList);
        setIsLoading(false);
    }

    useEffect(() => {
        if(!isInitialized){
            const searchedCities = localStorage.getItem('chronology');
            if(!localStorage.getItem('chronology'))
                localStorage.setItem('chronology', JSON.stringify([]));
            else
                setCities(JSON.parse(searchedCities));

            setIsInitialized(true);
        }

        if(searchTerm === '')
            setCities(JSON.parse(localStorage.getItem('chronology')))

        getCities(searchTerm);
    }, [searchTerm])

    return (
        <form className="search-input"
            id="search-form" onSubmit={(e) => {
                e.preventDefault();
                if (searchTerm !== '') {
                    document.querySelector('.dropdown-search').classList.remove('open');
                    document.querySelector('#search').blur();
                    searchDataHandle(searchTerm, true, false);
                }
            }}
        >
            <Search size={22} className='btn search'/>
            <X size={22} className='btn del' onClick={() => {setSearchTerm('')}}/>
            
            <input 
                type="text" name="search" id="search" placeholder={languages[language.id].placeholder} autoComplete="off"
                value={searchTerm}
                onFocus={() => document.querySelector('.dropdown-search').classList.add('open')} 
                onChange={(e) => {setSearchTerm(e.target.value)}}
            />

            <div className="dropdown-search">
                <div className="headers">
                    <small>{searchTerm === '' ? 'Latest searches:' : 'Suggested cities:'}</small>

                    {!searchTerm && (<small onClick={(e) => {localStorage.setItem('chronology', JSON.stringify([])); setCities([]);}}>
                        <Trash2 size={16} className="trash"></Trash2>
                        Clear all
                    </small>)}
                    
                </div>
                {isLoading && searchTerm !== '' ? 
                    (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) 
                    : 
                    (
                        cities.map((city, index) => {
                            return(
                                <div key={index} className="city" 
                                    onClick={() => {
                                        setSearchTerm(city.name);
                                        document.querySelector('.dropdown-search').classList.remove('open');
                                        document.querySelector('#search').blur();
                                        searchDataHandle(city.name, true, false, city.latitude, city.longitude, city.countryCode, city.region);
                                        addNewSearchedCity({name: city.name, region: city.region, countryCode: city.countryCode, lat: city.latitude, lon: city.longitude});
                                    }}
                                >
                                    <MapPin size={20} className='mapin'/>
                                    {city.name}, {city.region}, {city.countryCode}
                                </div>
                            )
                        })
                    )
                }
            </div>
        </form>
    )
}

export default Searchbar

