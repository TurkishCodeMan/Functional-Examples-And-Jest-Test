import { OpenWeather } from "./open_weather";
import moment from "moment";



function Weather(dt,temp){
    return {
        dt,
        temp
    }
}

function toWeather(dt,temp){
    return Weather(moment(dt).format(),toFahrenheit(temp));
}

function toFahrenheit(k){
    return k-273;
}


function toLi(weather){
    return `<li>${weather.dt} ${weather.temp}</li>`
}

function prepareItems(w){
    return toWeather(w.dt,w.main.temp)
}
function getWeatherItems(cityName){
    return OpenWeather.fetch(cityName)
        .map(prepareItems)
        .map(toLi)
}

function ui(){
    const goButton=document.querySelector(".find");
    const input=document.getElementById("city-name");
    const results=document.querySelector(".results");
    goButton.addEventListener('click',()=>{
        var cityName=input.value.trim();
        return getWeatherItems(cityName).fork(console.error,html=>{
            results.innerHTML=html;
        })
    })
}



export function app() {
    ui();
}



//-------------------------