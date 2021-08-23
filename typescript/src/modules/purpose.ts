#!/usr/bin/env node

import bridge from './bridge'

export function determineUseCase() {
    displayHelp()
    askForInput();
}

async function askForInput() {
    const stdin = process.openStdin();
    stdin.addListener("data", d => {
        let input = d.toString().trim()
        analyseInput(input)
    });
}

function analyseInput(input: string) {
    let msg = input.toLowerCase();
    if (checkExit(msg)) process.exit()
    else keywordCheck(msg)
}

function checkExit(input: string) {
    if (input === 'exit' || input === 'quit' || 
        input === 'stop' || input === 'bye' ||
        input === 'shutdown') {
            console.log("Goodbye!")
            return true
    }
}

function keywordCheck(input: string) {
    let newInput = input.split(' ')[0]
    let query = input.replace(newInput, '')
    if (newInput === "help") displayHelp(true)
    else bridge(newInput, query)
}

function displayHelp(secondRun: boolean = false) {
    if (secondRun) {
        console.log("\nStart your query with one word to direct you to the right module:")
    } else {
        console.log("Start your query with one word to direct you to the right module:")
    }
    console.log(" ['wiki', 'weather', 'network', 'help', 'exit']")
}
