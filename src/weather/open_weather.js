import { compose, map } from "ramda";
import { Task } from "../lib/types";


function fetchIt(url) {
    return Task((rej, res) => {
        return fetch(url)
            .then(v => v.json())
            .then(res)
            .catch(rej);
    })
}

function makeWeatherUrl(cityName) {
    return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dfc681da09a98952250b96eb90d71cf1`;
}


const OpenWeather = {
    fetch: compose(fetchIt, makeWeatherUrl)
}


export { OpenWeather }