import { useContext, useMemo } from "react";
import { GlobalContext } from '../../../App';
import { Search, X, MapPin, Trash2 } from 'react-feather'

const Searchbar = () => {
    const { searchTerm, searchDataHandle } = useContext(GlobalContext);

    let searchedCities = JSON.parse(localStorage.getItem('searchedCities') || JSON.stringify([{name: 'palermo'}, {name: 'milano'}, {name: 'catania'}]));
    let filteredSearchedCities = searchedCities.filter((city) => {
        if(city.name.toLowerCase().includes(searchTerm.searchTerm.toLowerCase()))
            return city;
    }) || searchedCities;
    const finalCities = !filteredSearchedCities.length ? searchedCities : filteredSearchedCities;

    return (
        <div className="search-input">
            <Search size={22} className='btn'/>
            {searchTerm && (<X size={22} className='btn del' onClick={() => {document.getElementById('search').value = ''; document.querySelector('.dropdown-search').classList.remove('open'); searchTerm.setSearchTerm('')}}/>)}
            
            <input 
                type="text" name="search" id="search" placeholder='Search city...' autoComplete="off"
                ref={searchTerm}
                onBlur={() => document.querySelector('.dropdown-search').classList.remove('open')} 
                
                onFocus={() => document.querySelector('.dropdown-search').classList.add('open')} 
                onKeyDown={(e) => {
                    if(e.code === 'Enter' && e.target.value !== ''){
                        document.querySelector('.dropdown-search').classList.remove('open');
                        e.target.blur();
                        searchDataHandle(e.target.value, true);
                    }}
                }
            />

            <div className="dropdown-search">
                <div className="headers">
                    <small>Latest searches:</small>

                    <small onClick={() => {localStorage.setItem('searchedCities', JSON.stringify([])); searchedCities = JSON.stringify([])}}>
                        <Trash2 size={16} className="trash"></Trash2>
                        Clear all
                    </small>
                    
                </div>
                {
                    finalCities.map((city, index) => {
                        return(
                            <div key={index} className="city" 
                                onClick={() => {
                                    searchTerm.current.value = city.name;
                                    document.querySelector('.dropdown-search').classList.remove('open');
                                    searchDataHandle(city.name);
                                }}
                            >
                                <MapPin size={20} className='mapin'/>
                                {city.name}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Searchbar