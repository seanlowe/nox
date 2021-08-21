#!/usr/bin/env node

import netgear = require('./network');
import weather = require('./weather');
import wiki = require('./wiki');

// bridge module for calling other modules
export default async function bridge(mod: string, input: string = '') {
    // call module with input
    switch(mod) {
        case 'network':
            await netgear.test()
            break
        case 'weather':
            await weather.currentLocalWeatherReport()
            break
        case 'wiki':
            if (input) await wiki.search(input)
            break
    }
}