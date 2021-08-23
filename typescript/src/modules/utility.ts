#!/usr/bin/env node

// import * as env from '../env';
import axios from 'axios';
import chalk = require('chalk');
import clear = require('clear');
import figlet = require('figlet');

export async function getIPAddress() {
    const address = await axios.get("https://api.ipify.org/");
    return address.data;
}

export async function getLatLonCoords(address: string) {
    const response = await axios.get(`http://ip-api.com/json/${address}`);

    if (response.data.status !== "success") {
        return "Unable to get Lat/Long coordinates!";
    }
    
    return [
        response.data['lat'],
        response.data['lon']
    ];
}

export function terminal() {
    // add logic that only displays clean terminal output if in a console
    // clear out terminal window
    clear();

    // print banner
    console.log(
        chalk.cyan(
            figlet.textSync('NOX-CLI', { horizontalLayout: 'full' })
        )
    );
}

export function truncateDecimals(number: number, digits: number) {
    let multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

export function convertFromEpoch(time: number, offset: number) {
    return new Date((time+offset) * 1000);
}

export function isNumeric(input: any){
    return !isNaN(input)
}

export function convertToSnakeCase(input: string) {
    // courtesy of https://stackoverflow.com/questions/52963900/convert-different-strings-to-snake-case-in-javascript
    // return input.charAt(0).toLowerCase() + input.slice(1)
    return input.replace(/\W+/g, " ")
      .replace(/([a-z])([A-Z])([a-z])/g, "$1 $2$3")
      .split(/\B(?=[A-Z]{2,})/)
      .join(' ').split(' ')
      .map((word) => { 
        return word[0].toUpperCase() + word.substring(1); 
      }).join(' ')
      .split(' ').join('_')
    //   .join(' ').split(' ').join('_').toLowerCase()
}

export function displayArrayWithIndexes(input: []) {
    let counter = 1
    for (const entry in input) {
        console.log(`${counter} - ${input[entry]}`)
        counter++
    }
}

export function isValidIndex(index: number, length: number) {
    return index >= 0 && index < length
}
