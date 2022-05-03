#!/usr/bin/env node


export function greetUser() {
    const hours = new Date().getHours();
    const msg = determineGreetingTime(hours);

    console.log(msg);
}


function determineGreetingTime(hour: number) {
    if (hour >= 0 && hour < 12) {
        return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    } else if (hour >= 17 && hour <= 23) {
        return "Good Evening";
    }

    return "Good Night";
}