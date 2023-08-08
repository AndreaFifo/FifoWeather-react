const weatherIcon = {
    '04': {
        d: 'broken-cloudy.png',
        n: 'broken-cloudy.png',
    },
    '03': {
        d: 'sun-mid-cloudy.png',
        n: 'night-mid-cloudy.png',
    },
    '02': {
        d: 'sun-lil-cloudy.png',
        n: 'night-lil-cloudy.png',
    },
    '01': {
        d: 'clear-sun.png',
        n: 'moon.png',
    },
    '09': {
        d: 'rain.png'
    },
    '10': {
        d: 'sun-rain.png',
        n: 'night-rain.png',
    },
    '11': {
        d: 'thunder.png',
    }
}

export const weatherImg = (icon, time) => {
    const path = 'src/assets/weather/';
    const number = icon.slice(0, 2);
    let letter = '';

    if (number === '10')
        //Questo caso vale solamente per il tempo "sole con pioggia e luna con pioggia"
        letter = time >= 6 && time < 18 ? 'd' : 'n';
    else
        letter = icon.slice(-1);

    return path + weatherIcon[number][letter];
}

export const capitalizeString = (string) => string[0].toUpperCase() + string.slice(1);
