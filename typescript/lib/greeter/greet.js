#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetUser = void 0;
function greetUser() {
    var hours = new Date().getHours();
    var msg = determineGreetingTime(hours);
    console.log(msg);
}
exports.greetUser = greetUser;
function determineGreetingTime(hour) {
    // const intHour = parseInt(hour);
    if (hour >= 0 && hour < 12) {
        return "Good Morning";
    }
    else if (hour >= 12 && hour < 17) {
        return "Good Afternoon";
    }
    else if (hour >= 17 && hour <= 23) {
        return "Good Evening";
    }
    return "Good Night";
}
