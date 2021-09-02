#!/usr/bin/env node

import axios, {AxiosResponse} from 'axios';
import jsdom = require("jsdom");
import { isNumeric, displayArrayWithIndexes, isValidIndex, sanitize } from './utility';


const baseUrl = "https://en.wikipedia.org/"

export async function search(input: string) {
    let url = baseUrl + "w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";
    let needle = sanitize(input);
    url += needle;

    const response = await axios.get(url)
    selectResult(response);
}

async function selectResult(response: AxiosResponse) {
    const pages = response.data.query.pages;
    let options: any = [];
    for (let result in pages) {
        options.push(sanitize(pages[result].title))
    }

    console.log("\nPlease pick from the following: ")
    displayArrayWithIndexes(options)

    await chooseResult(options)

    console.log("outside of stdin.addListener with options", options)
    // options.length = 0 // clear array without creating a new reference to array
}

async function chooseResult(options: []) {
    const stdin = process.openStdin();
    stdin.addListener("data", async d => {
        // we display the options starting from 1, so remove one
        let input = d.toString().trim() - 1
        if (isNumeric(input) && isValidIndex(input, options.length)) {
            await showResult(options[input])
        }
        
        // TODO: figure out way to map non-numerical input
        // REASON: results from wikipedia are not consistent, 
        // all are connected by _ but are not consistently 
        // all lower or all upper, or all first letter upper
        // non case sensitive contains / indexOf would solve this
    });
    
    stdin.end()
}


async function showResult(selectedResult: string) {
    console.log(`inside showResult with ${selectedResult}`)
    const page = await axios.get(baseUrl + "wiki/" + selectedResult);
    const { JSDOM } = jsdom;

    const dom = new JSDOM(page.data);

    // build query selector
    let doc = dom.window.document;
    let selector = "#content > #bodyContent > #mw-content-text > .mw-parser-output > p:not([class])";
    let data = doc.querySelector(selector)?.textContent;

    console.log(data);
}
