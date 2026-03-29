import { fetchHouses, getAllGhostTypes, scareLevelText, showError } from "./utils.js";

let houses = [];


async function start() {
  houses = await fetchHouses();


  if (!houses) {
    showError("error-message", "Något gick fel vid hämtning av hus. Försök igen senare.");
    return;
  }


  fillGhostTypes();
  showHouses(houses);

  const maxPrice = document.getElementById("max-price");
  maxPrice.addEventListener("input", filterHouses);

  const scareLevel = document.getElementById("scare-level");
  scareLevel.addEventListener("input", filterHouses);

  const ghostType = document.getElementById("ghost-type");
  ghostType.addEventListener("change", filterHouses);

  const wifiOnly = document.getElementById("wifi-only");
  wifiOnly.addEventListener("change", filterHouses);

  scareLevel.addEventListener("input", function () {
    const minScare = Number(this.value);
    const label = document.getElementById("scare-label");
    label.textContent = minScare === 0 ? "Alla" : scareLevelText(minScare);
  });
}


function fillGhostTypes() {
  const select = document.getElementById("ghost-type");
  const types = getAllGhostTypes(houses);


  for (const type of types) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    select.append(option);
  }
}


function showHouses(list) {
  const box = document.getElementById("houses");
  box.textContent = "";


  if (list.length === 0) {
    box.innerHTML = `<p id="no-results">Inga hus matchar din sökning. Prova att ändra filtren!</p>`;
    return;
  }


  for (const house of list) {
    const card = makeCard(house);
    box.append(card);
  }
}


function makeCard(house) {
  const card = document.createElement("article");
  card.classList.add("card");


  card.innerHTML = `
    <img src="img/${house.image}" alt="${house.name}">
    <h3>${house.name}</h3>
    <p class="location">${house.location}</p>
    <div class="card-info">
      <span class="price">${house.pricePerNight} kr/natt</span>
      <span class="badge">${scareLevelText(house.scareLevel)}</span>
    </div>
    <a class="btn" href="house.html?id=${house.id}">Läs mer och boka</a>
  `;


  return card;
}


function filterHouses() {
  const topPrice = Number(document.getElementById("max-price").value);
  const minScare = Number(document.getElementById("scare-level").value);
  const chosenType = document.getElementById("ghost-type").value;

  const needsWifi = document.getElementById("wifi-only").checked;

  const result = houses.filter(function (house) {
    if (topPrice > 0 && house.pricePerNight > topPrice) return false;
    if (minScare > 0 && house.scareLevel < minScare) return false;
    if (chosenType !== "" && !house.ghostTypes.includes(chosenType)) return false;
    if (needsWifi && !house.hasWifi) return false;
    return true;
  });

  showHouses(result);
}

start();