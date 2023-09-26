import { useContext, useEffect, useState, memo } from "react";
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
    const [searchTerm, setSearchTerm] = useState('');

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
                type="text" name="search" id="search" placeholder={languages[language.id].placeholder.input} autoComplete="off"
                spellCheck='false'
                value={searchTerm}
                onFocus={() => document.querySelector('.dropdown-search').classList.add('open')} 
                onChange={(e) => {setSearchTerm(e.target.value)}}
            />

            <DropDown 
                searchTerm={{searchTerm, setSearchTerm}} 
                language={language} 
                searchDataHandle={searchDataHandle}
            />
        </form>
    )
}

const DropDown = ({searchTerm: {searchTerm, setSearchTerm}, language, searchDataHandle }) => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getCities(searchTerm){
        setIsLoading(true);
        try{
            const citiesList = await fetchCities(searchTerm);
            setCities(citiesList);
            setIsLoading(false);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        //Quando clicco sull'input, viene controllata la cronologia e
        //Se non ho scritto niente allora mostra le città cercate in precedenza
        if(searchTerm === '')
            setCities(JSON.parse(localStorage.getItem('chronology')));

        //Caso in cui scrivo qualcosa e cerco le città
        if(searchTerm.trim() !== '') 
            getCities(searchTerm);
        
    }, [searchTerm])

    return (
        <div className="dropdown-search">
            <div className="headers">
                <small>{searchTerm === '' ? languages[language.id].placeholder.latestSearches : languages[language.id].placeholder.suggestedCities}</small>
                    {
                        !searchTerm && (<small onClick={(e) => {localStorage.setItem('chronology', JSON.stringify([])); setCities([])}}>
                                            <Trash2 size={16} className="trash"></Trash2> {languages[language.id].placeholder.clear}
                                        </small>)
                    }
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
    )
}

export default Searchbar

