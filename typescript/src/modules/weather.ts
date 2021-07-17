#!/usr/bin/env node

import * as env from '../env';
import {getIPAddress, getLatLonCoords, convertFromEpoch} from './utility';
import axios from 'axios';

async function setUpAPICall() {
    const addr = await getIPAddress();
    const coords = await getLatLonCoords(addr);

    return coords;
}


// https://openweathermap.org/current
async function currentWeather() {
    const units = "imperial";
    const coords = await setUpAPICall();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&units=${units}&appid=${env.OPEN_WEATHER_API_KEY}`

    const response = await axios.get(url);

    return response;
}

// https://openweathermap.org/api/one-call-api
async function oneCall() {
    const excludes = "minutely,current";
    const units = "imperial";
    const coords = await setUpAPICall();
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&exclude=${excludes}&units=${units}&appid=${env.OPEN_WEATHER_API_KEY}`
    
    const response = await axios.get(url);

    return response;
}

export async function currentLocalWeatherReport() {
    const response = await currentWeather();

    const report = {
        description: response.data.weather[0].description,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
    };

    console.log(report);
}

export async function dailyWeatherReport() {
    const response = await oneCall();
    const offset = response.data.timezone_offset;
    const today = new Date();

    let hourly = [];
    let counter = 0;
    for (let entry of response.data.hourly) {
        let date = convertFromEpoch(entry.dt, offset)

        if (today.getHours() < 10) {
            // if it's early morning, only get today
            if (date.getUTCDate() !== today.getUTCDate()) break;
        } else if (today.getHours() > 18) {
            // if it's early evening, get rest of today and early morning
            if (counter > 14 && date.getUTCHours() > 8) break;
        } else { 
            // get the full 24 hours
            if (counter >= 25) break;
        }

        hourly[counter] = {
            hour: date.getUTCHours(),
            temp: entry.temp,
            humidity: `${entry.humidity} %`,
            description: entry.weather[0].description,
        };

        counter++;
    }

    const report = {
        description: response.data.daily[0].weather[0].description,
        today: {
            sunrise: convertFromEpoch(response.data.daily[0].sunrise, offset).getUTCHours(),
            sunset: convertFromEpoch(response.data.daily[0].sunset, offset).getUTCHours(),
            hi: response.data.daily[0].temp.max,
            low: response.data.daily[0].temp.max,
            uvi: response.data.daily[0].uvi,
        },
        hourly: hourly,
    };

    console.log(report);
}

// get all weather for the day
// - uv index
// - air pollution
// - weather alerts