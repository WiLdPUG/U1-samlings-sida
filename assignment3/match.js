export class Match {
  #playerA;
  #playerB;
  #winner;
  #el;

  constructor(playerA, playerB, onPlayed) {
    this.#playerA = playerA;
    this.#playerB = playerB;
    this.#winner = null;
    this.#el = null;
    this.onPlayed = onPlayed;
  }

  get winner() {
    return this.#winner;
  }

  get isPlayed() {
    return this.#winner !== null;

  }
  get playerA() {
    return this.#playerA;
  }

  get playerB() {
    return this.#playerB;
  }

  setWinner(winner) {
    if (this.isPlayed) return;

    const ok = winner === this.#playerA || winner === this.#playerB;
    if (!ok) return;

    this.#winner = winner;
    this.#updateLook();

    if (this.onPlayed) {
      this.onPlayed();
    }
  }

  render() {
    if (this.#el) return this.#el;

    const matchEl = document.createElement("div");
    matchEl.classList.add("match");

    const title = document.createElement("h3");
    title.textContent = "Match";

    const cookA = this.#createPlayerElement(this.#playerA);
    const divider = document.createElement("hr");
    const cookB = this.#createPlayerElement(this.#playerB);

    cookA.addEventListener("click", () => this.setWinner(this.#playerA));
    cookB.addEventListener("click", () => this.setWinner(this.#playerB));

    cookA.style.cursor = "pointer";
    cookB.style.cursor = "pointer";

    matchEl.append(title, cookA, divider, cookB);

    this.#el = matchEl;
    return this.#el;
  }

  #updateLook() {
    if (!this.#el) return;

    const cards = this.#el.querySelectorAll(".player");
    const cardA = cards[0];
    const cardB = cards[1];

    cardA.classList.remove("winner", "loser");
    cardB.classList.remove("winner", "loser");

    if (this.#winner === this.#playerA) {
      cardA.classList.add("winner");
      cardB.classList.add("loser");
    } else {
      cardB.classList.add("winner");
      cardA.classList.add("loser");
    }


  }

  #createPlayerElement(player) {
    const cook = player.name ?? "Okänd";
    const skill = player.skillLevel ?? "—";
    const phrase = player.catchphrase ?? "Ingen catchphrase";

    const cookCard = document.createElement("div");
    cookCard.classList.add("player");

    const strong = document.createElement("strong");
    strong.textContent = cook;

    const skillLine = document.createElement("div");
    skillLine.textContent = `Skill: ${skill}`;

    const phraseLine = document.createElement("div");
    phraseLine.textContent = `"${phrase}"`;

    cookCard.append(strong, skillLine, phraseLine);
    return cookCard;
  }
}