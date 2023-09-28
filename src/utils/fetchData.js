import axios from 'axios';

export const fetchData = async (options) => {
    const { city, unit, language, data, unitLang, latitude, longitude, countryCode, region } = options;
    const apiKey = import.meta.env.VITE_APIKEY;

    try {
        let response, coordinates;
        if (latitude !== null && longitude !== null)
            response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${unit === 'C' ? 'metric' : 'imperial'}&lang=${language.id}&appid=${apiKey}`);
        else {
            coordinates = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`);
            const { lat, lon } = coordinates.data[0];
            response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit === 'C' ? 'metric' : 'imperial'}&lang=${language.id}&appid=${apiKey}`);
            addNewSearchedCity({ name: city, region: coordinates.data[0].state, countryCode: coordinates.data[0].country, lat: coordinates.data[0].lat, lon: coordinates.data[0].lon });
        }
        return {
            data: response.data,
            city,
            id: unitLang ? data.id : Date.now(),
            country: countryCode ? countryCode : coordinates.data[0].country,
            region: region ? region : coordinates.data[0].state,
            lat: latitude !== null && longitude !== null ? latitude : coordinates.data[0].lat,
            lon: latitude !== null && longitude !== null ? longitude : coordinates.data[0].lon,
        };
    } catch (error) {
        console.log(error);
    }
}

export const fetchCities = async (searchTerm, cancelToken) => {
    try {
        const cities = await axios.get(`https://api.geocode.city/autocomplete?q=${searchTerm}`, { cancelToken: cancelToken });

        return cities.data;
    } catch (error) {
        console.log(error);
    }
}

export const addNewSearchedCity = (options) => {
    const citiesSearched = JSON.parse(localStorage.getItem('chronology'));

    const existingCityIndex = citiesSearched.findIndex(city => city.name === options.name && city.region === options.region && city.countryCode === options.countryCode)
    if (existingCityIndex !== -1)
        citiesSearched.splice(existingCityIndex, 1);

    citiesSearched.unshift({ ...options });

    localStorage.setItem('chronology', JSON.stringify(citiesSearched));
}

export function changeTimeZone(date, timezone) {
    return new Date(
        new Date(date).toLocaleString('en-US', { timeZone: timezone })
    );
}