#!/usr/bin/env node

import chalk = require('chalk');
import clear = require('clear');
import figlet = require('figlet');
import program = require('commander');
// import path = require('path');

import greeter = require('./modules/greet');
import weather = require('./modules/weather');
import purpose = require('./modules/purpose');
import wiki = require('./modules/wiki');

// -------------

clear();
console.log(
    chalk.cyan(
        figlet.textSync('NOX-CLI', { horizontalLayout: 'full' })
    )
);

program
    .version('0.0.3')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-s, --search <string>', 'search for something')
    .option('-t, --tinker', 'Boot into tinker mode')

program.parse(process.argv);

const options = program.opts();

greeter.greetUser();
if (Object.keys(options).length !== 0) {
    if (Object.keys(options).includes('search')) {
        wiki.search(options['search']);
    }
    // purpose.determineUseCase();

} else {
    console.log("No options supplied!");
}