#!/usr/bin/env node

import * as fs from 'fs';


const basePath="/Users/slowe/sites/nox/typescript";
const file=`${basePath}/assets/events.txt`;

export async function calendar() {
    let events = await getEvents();
    console.log(events);
}


async function getEvents() {
    // endpoint for external API that should receive calendar data from daily automation on my phone
    // check for last touched date on file
    const stats = fs.statSync(file);

    const lastModified = stats.mtime.toLocaleDateString();
    const today = new Date().toLocaleDateString();

    // only get events if it's been modified with new events
    if (lastModified === today) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
              return console.log(err);
            }
    
            let events = data.split('\n').filter(i => (i !== "Events for Today:" && i !== ""));

            console.log("getEvents", events)
            return events;
        });
    }
}