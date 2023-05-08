import axios from 'axios';

export const fetchData = async (options) => {
    const {searchTerm, unit, language, apiKey} = options;

    try {
        //Get coordinates
        const coordinates = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm.searchTerm}&limit=5&appid=${apiKey}`);
        const {lat, lon} = coordinates.data[0];
        const name = document.getElementById('search').value.charAt(0).toUpperCase() + document.getElementById('search').value.slice(1);

        //Get weather data
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit.unit}&lang=${language.language}&appid=${apiKey}`);

        return {data, name};
    } catch (error) {
        console.log(error);
    }
}