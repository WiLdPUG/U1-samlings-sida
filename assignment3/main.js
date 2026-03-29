import { startTournament } from "./tournament.js";

let contestants = [];

async function loadContestants() {
    const response = await fetch("./contestants.json");
    contestants = await response.json();
    console.log("contestants:", contestants);
}

async function start() {
    await loadContestants();
    startTournament(contestants);
}
start();