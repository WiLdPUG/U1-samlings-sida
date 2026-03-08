import { assignments } from "./assignments.js";
import { createNavigation } from "./globalnav.js";

function renderCards() {
  const container = document.getElementById("assignments-card");
  if (!container) return;

  container.textContent = "";

  container.innerHTML = "";

  let html = "";

  for (const element of assignments) {
    if (element.id === "home") continue;

    html += `
      <article class="assignment-card">
        <h3>${element.title}</h3>
        <p>${element.description}</p>
        <a class="card-link" href="${element.link}">Öppna</a>
      </article>
    `;
  }

  container.innerHTML = html;
}

function backHome(path) {
  const page = document.body.dataset.page || "home";
  if (page === "home") return;

  const main = document.querySelector("main");
  if (!main) return;

  const back = document.createElement("a");
  back.href = path + "index.html";
  back.textContent = "<-- Till startsidan";
  back.classList.add("card-link");

  
  main.prepend(back);
}

const page = document.body.dataset.page || "home";
const path = page === "home" ? "" : "../";

createNavigation(page, path);
backHome(path);

if (page === "home") {
  renderCards();
}
