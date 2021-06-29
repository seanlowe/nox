#!/usr/bin/env node
"use strict";
// import * as chalk from 'chalk';
// import * as figlet from 'figlet';
// import * as path from 'path';
// import * as program from 'commander';
// import * as greeter from './greeter/greet';
// import * as extra from './extra/pizza';
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var clear = require("clear");
var figlet = require("figlet");
var program = require("commander");
var greeter = require("./greeter/greet");
var purpose = require("./purpose/purpose");
// -------------
clear();
console.log(chalk.cyan(figlet.textSync('NOX-CLI', { horizontalLayout: 'full' })));
program
    .version('0.0.1')
    .description("SSLv2's attempt at a basic version of JARVIS")
    .option('-t, --tinker', 'Boot into tinker mode');
program.parse(process.argv);
var options = program.opts();
// console.log(options);
if (Object.keys(options).length === 0) {
    // greet user
    // determine purpose of use
    // accomplish purpose
    // exit
    greeter.greetUser();
    purpose.determineUseCase();
}
else {
    console.log("I'm not going to do anything with these options");
    // extra.pizzaFunction(options);
}
