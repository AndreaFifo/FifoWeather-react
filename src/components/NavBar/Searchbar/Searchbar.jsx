import { useContext, useEffect } from "react";
import { Context } from '../../../App';
import { Search, X, MapPin, Trash2} from 'react-feather'

const Searchbar = () => {
    const {searchTerm} = useContext(Context);

    let searchedCities = JSON.parse(localStorage.getItem('searchedCities') || JSON.stringify([{name: 'palermo'}, {name: 'milano'}, {name: 'catania'}]));
    let filteredSearchedCities = searchedCities.filter((city) => {
        if(city.name.toLowerCase().includes(searchTerm.searchTerm.toLowerCase()))
            return city;
    }) || searchedCities;
    const finalCities = !filteredSearchedCities.length ? searchedCities : filteredSearchedCities;

    console.log('Searchbar render');
    return (
        <div className="search-input">
            <Search size={22} className='btn'/>
            {searchTerm.searchTerm && (<X size={22} className='btn del' onClick={() => {document.getElementById('search').value = ''; document.querySelector('.dropdown-search').classList.remove('open'); searchTerm.searchTermHandle('')}}/>)}
            
            <input 
                type="text" name="search" id="search" placeholder='Search city...' autoComplete="off"
                value={searchTerm.searchTerm} 
                onBlur={() => document.querySelector('.dropdown-search').classList.remove('open')} 
                onChange={(e) => {searchTerm.searchTermHandle(e.target.value)}} 
                onFocus={() => document.querySelector('.dropdown-search').classList.add('open')} 
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
                            <div key={index} className="city" onClick={() => searchTerm.searchTermHandle(city.name)}>
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