import axios from 'axios';

export const fetchData = async (options) => {
    const { city, unit, language, data, unitLang } = options;
    const apiKey = import.meta.env.VITE_APIKEY;

    try {
        //Get coordinates
        const coordinates = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
        const { lat, lon } = coordinates.data[0];
        const name = city;

        //Get weather data
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit === 'C' ? 'metric' : 'imperial'}&lang=${language.id}&appid=${apiKey}`);

        return { data: response.data, name, id: unitLang === true ? data.id : Date.now() };
    } catch (error) {
        console.log(error);
    }
}