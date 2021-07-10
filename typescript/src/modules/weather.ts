#!/usr/bin/env node

import * as process from 'process';
import axios from 'axios';

export async function weatherReport() {
    console.log(process.env.OPEN_WEATHER_API_KEY);
    // get city
    const city = 'Denver';
    const url = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`

    // const response = await axios.get(url);
    console.log("some phony response data");
}