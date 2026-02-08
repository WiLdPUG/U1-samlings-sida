import { assignments } from "./assignments.js";

export function createNavigation(currentpage = "home", homePath = "") {
  const nav = document.getElementById("global-nav");
  if (!nav) return;

  nav.textContent = ""; // rensa

  const ul = document.createElement("ul");

  for (const element of assignments) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `${homePath}${element.link}`;
    a.textContent = element.title;

    if (element.id === currentpage) {
      a.classList.add("active");
    }

    li.append(a);
    ul.append(li);
  }

  nav.append(ul);
}
