import { Match } from "./match.js";

let contestants = [];
let quarterMatches = [];
let semiMatches = [];
let finalMatch = null;

export function startTournament(loadedContestants) {
  contestants = loadedContestants;


  document.getElementById("quarterfinals").textContent = "";
  document.getElementById("semifinals").textContent = "";
  document.getElementById("final").textContent = "";


  const btn = document.getElementById("restart-btn");
  btn.onclick = () => startTournament(contestants);

  renderQuarterfinals();
}

function renderQuarterfinals() {
  const box = document.getElementById("quarterfinals");
  box.textContent = "";
  quarterMatches = [];

  

  for (let i = 0; i < contestants.length; i += 2) {
    const m = new Match(contestants[i], contestants[i + 1], checkQuarterDone);
    quarterMatches.push(m);
    box.append(m.render());
  }
}

function checkQuarterDone() {
  const allDone = quarterMatches.every((m) => m.isPlayed);

  if (allDone) {
    renderSemifinals();
  }
}

function renderSemifinals() {
  const winners = quarterMatches.map((m) => m.winner);

  const box = document.getElementById("semifinals");
  box.textContent = "";
  semiMatches = [];

  

  for (let i = 0; i < winners.length; i += 2) {
    const m = new Match(winners[i], winners[i + 1], checkSemiDone);
    semiMatches.push(m);
    box.append(m.render());
  }
}

function checkSemiDone() {
  const allDone = semiMatches.every((m) => m.isPlayed);

  if (allDone) {
    renderFinal();
  }
}

function renderFinal() {
  const winners = semiMatches.map((m) => m.winner);

  const box = document.getElementById("final");
  box.textContent = "";

  

  finalMatch = new Match(winners[0], winners[1], showWinner);
  box.append(finalMatch.render());
}

function showWinner() {
  const box = document.getElementById("final");
  const winnerText = document.createElement("p");
  winnerText.classList.add("winner-text");
  winnerText.textContent = `Vinnare: ${finalMatch.winner.name}`;

  finalMatch.render().append(winnerText);
}

