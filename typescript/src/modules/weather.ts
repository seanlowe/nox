#!/usr/bin/env node

import * as env from '../env';
import {getIPAddress, getLatLonCoords, truncateDecimals} from './utility';
import axios from 'axios';

export async function weatherReport() {
    let addr = await getIPAddress();
    let coords = await getLatLonCoords(addr);
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&appid=${env.OPEN_WEATHER_API_KEY}`

    const response = await axios.get(url);

    const temp = (response.data.main.temp - 273) * 1.8 + 32;

    const report = {
        description: response.data.weather[0].description,
        temp: truncateDecimals(temp, 2),
        humidity: response.data.main.humidity,
    };

    console.log(report);
}