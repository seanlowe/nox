#!/usr/bin/env node

import chalk = require('chalk');
import clear = require('clear');
import figlet = require('figlet');
import program = require('commander');
// import path = require('path');

import greeter = require('./modules/greet');
import weather = require('./modules/weather');
import purpose = require('./modules/purpose');

// -------------

clear();
console.log(
    chalk.cyan(
        figlet.textSync('NOX-CLI', { horizontalLayout: 'full' })
    )
);

program
    .version('0.0.1')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-t, --tinker', 'Boot into tinker mode')

program.parse(process.argv);

const options = program.opts();

if (Object.keys(options).length === 0) {
    greeter.greetUser();
    // purpose.determineUseCase();

} else {
    console.log("I'm not going to do anything with these options");
}