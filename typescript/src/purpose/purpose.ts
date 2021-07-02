#!/usr/bin/env node

export function determineUseCase() {
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
    if (checkExit(msg)) {
        process.exit();
    } else {
        console.log("you entered: [" + input + "]");
        keywordCheck(msg);
    }
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
    // implement function
}