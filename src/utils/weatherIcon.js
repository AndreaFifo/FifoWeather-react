import {
    brokenCloudy,
    clearSun,
    moon,
    nightLilCloudy,
    nightMidCloudy,
    nightRain,
    rain,
    sunLilCloudy,
    sunMidCloudy,
    sunRain,
    thunder
} from '../assets/index';

const weatherIcon = {
    '04': {
        d: brokenCloudy,
        n: brokenCloudy,
    },
    '03': {
        d: sunMidCloudy,
        n: nightMidCloudy,
    },
    '02': {
        d: sunLilCloudy,
        n: nightLilCloudy,
    },
    '01': {
        d: clearSun,
        n: moon,
    },
    '09': {
        d: rain
    },
    '10': {
        d: sunRain,
        n: nightRain,
    },
    '11': {
        d: thunder,
    }
}

export const weatherImg = (icon, time) => {
    const number = icon.slice(0, 2);
    let letter = '';

    if (number === '10')
        //Questo caso vale solamente per il tempo "sole con pioggia e luna con pioggia"
        letter = time >= 6 && time < 18 ? 'd' : 'n';
    else
        letter = icon.slice(-1);

    return weatherIcon[number][letter];
}

export const capitalizeString = (string) => string[0].toUpperCase() + string.slice(1);
