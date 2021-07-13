#!/usr/bin/env node

import program = require('commander');

// custom module imports
import greeter = require('./modules/greet');
import weather = require('./modules/weather');
import purpose = require('./modules/purpose');
import wiki = require('./modules/wiki');
import {terminal} from './modules/utility';

program
    .version('0.0.7.12')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-s, --search <string>', 'Search for something')
    .option('-w, --weather', 'Query the weather API')
    .option('-t, --tinker', 'Boot into tinker mode (remove banner and cls command)')
program.parse(process.argv);

const options = program.opts();

let keys = Object.keys(options);
if (keys.length !== 0) {
    if (!keys.includes('tinker')) {
        greeter.greetUser();
        terminal();
    }
    // convert to loop over arguments?
    // remove arguments as they are hit?
    if (keys.includes('search')) {
        wiki.search(options['search']);
    }
    if (keys.includes('weather')) {
        weather.weatherReport();
    }
    // purpose.determineUseCase();
} else {
    console.log("No options supplied!");
}