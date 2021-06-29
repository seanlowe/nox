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
    if (msg === 'exit' || msg === 'quit' || 
        msg === 'stop' || msg === 'bye' ||
        msg === 'shutdown') {
            console.log("Goodbye!")
            process.exit();
    } else {
        console.log("you entered: [" + input + "]");
    }
}