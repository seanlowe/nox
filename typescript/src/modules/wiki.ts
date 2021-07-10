#!/usr/bin/env node

import axios, {AxiosResponse} from 'axios';
import jsdom = require("jsdom");


const baseUrl = "https://en.wikipedia.org/"

export async function search(input: string) {
    let url = baseUrl + "w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch=";
    let needle = sanitize(input);
    url += needle;

    const response = await axios.get(url)
    selectResult(response);
}

function selectResult(response: AxiosResponse) {
    const pages = response.data.query.pages;
    let options = [];
    for (let result in pages) {
        options.push(sanitize(pages[result].title))
    }

    // TODO: add more logic to determine which possible option to show
    showResult(options[0]);
}


async function showResult(selectedResult: string) {
    const page = await axios.get(baseUrl + "wiki/" + selectedResult);
    const { JSDOM } = jsdom;

    const dom = new JSDOM(page.data);

    // build query selector
    let doc = dom.window.document;
    let selector = "#content > #bodyContent > #mw-content-text > .mw-parser-output > p:not([class])";
    let data = doc.querySelector(selector)?.textContent;

    console.log(data);
}

function sanitize(input: string, toBeReplaced: string = ' ', substitute: string = '_') {
    return input.split(toBeReplaced).join(substitute);
}