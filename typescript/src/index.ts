#!/usr/bin/env node

import chalk = require('chalk');
import clear = require('clear');
import figlet = require('figlet');
import program = require('commander');
import * as dotenv from 'dotenv';
// custom module imports
import greeter = require('./modules/greet');
import weather = require('./modules/weather');
import purpose = require('./modules/purpose');
import wiki = require('./modules/wiki');

// clear out terminal window
clear();

// print banner
console.log(
    chalk.cyan(
        figlet.textSync('NOX-CLI', { horizontalLayout: 'full' })
    )
);

program
    .version('0.0.4.5')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-s, --search <string>', 'Search for something')
    .option('-w, --weather', 'Query the weather API')
    .option('-t, --tinker', 'Boot into tinker mode')
program.parse(process.argv);

const options = program.opts();

dotenv.config();
console.log(process.env.OPEN_WEATHER_API_KEY);

greeter.greetUser();
let keys = Object.keys(options);
if (keys.length !== 0) {
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