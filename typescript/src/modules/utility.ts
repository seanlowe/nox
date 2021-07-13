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