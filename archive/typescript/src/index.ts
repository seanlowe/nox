#!/usr/bin/env node

import program = require('commander');

// custom module imports
import greeter = require('./modules/greet');
import netgear = require('./modules/network');
import purpose = require('./modules/purpose');
import weather = require('./modules/weather');
import wiki = require('./modules/wiki');

import cal = require('./modules/wip/calendar');

// utility functions
import {terminal} from './modules/utility';

program
    .version('0.0.10.1')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-n, --network', 'test network module')
    .option('-s, --search <string>', 'Search for something')
    .option('-t, --tinker', 'Boot into tinker mode (remove banner and cls command)')
    .option('-w, --weather', 'Query the weather API')
program.parse(process.argv);

const options = program.opts();

let keys = Object.keys(options);

// todo: refactor commandline argument parsing
if (keys.length !== 0) {
    if (!keys.includes('tinker')) {
        greeter.greetUser();
        terminal();
    }
    if (keys.includes('network')) {
        netgear.test();
    }
    if (keys.includes('search')) {
        wiki.search(options['search']);
    }
    if (keys.includes('weather')) {
        weather.dailyWeatherReport();
    }
} else {
    // cal.calendar();
    purpose.determineUseCase();
}
