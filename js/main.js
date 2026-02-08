// js/main.js
import { assignments } from "./assignments.js";
import { createNavigation } from "./globalnav.js";

function renderCards() {
  const container = document.getElementById("assignments-card");
  if (!container) return;

  container.textContent = "";

  for (const element of assignments) {
    if (element.id !== "home") {
      const article = document.createElement("article");
      article.classList.add("assignment-card");

      const h3 = document.createElement("h3");
      h3.textContent = element.title;

      const p = document.createElement("p");
      p.textContent = element.description; 

      const a = document.createElement("a");
      a.href = element.link;
      a.textContent = "Öppna";
      a.classList.add("card-link");

      article.appendChild(h3);
      article.appendChild(p);
      article.appendChild(a);

      container.appendChild(article);
    }
  }
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

  
  main.appendChild(back);
}

// --- Init ---
const page = document.body.dataset.page || "home";
const path = page === "home" ? "" : "../";

createNavigation(page, path);
backHome(path);

if (page === "home") {
  renderCards();
}
