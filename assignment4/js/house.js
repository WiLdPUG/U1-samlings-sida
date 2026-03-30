import { fetchHouses, findHouse, scareLevelText, showError } from "./utils.js";
import { Booking } from "./booking.js";

let booking = null;

async function start() {
  const data = await fetchHouses();


  if (!data) {
    showError("error-message", "Något gick fel vid hämtning av hus. Försök igen senare.");
    return;
  }


  const locationInfo = new URLSearchParams(window.location.search);
  const id = Number(locationInfo.get("id"));


  const house = findHouse(data, id);


  if (!house) {
    showError("error-message", "Huset hittades inte. <a href='index.html'>Gå tillbaka till alla hus</a>");
    return;
  }


  showHouse(house);
  showMap(house);


  booking = new Booking(house);
  setupForm();
}


function showHouse(house) {
  const boxAdress = document.getElementById("detail");


  boxAdress.innerHTML = `
    <img src="img/${house.image}" alt="${house.name}">
    <div class="info">
      <h2>${house.name}</h2>
      <p class="location">${house.location}</p>
      <p>${house.description}</p>
      <div class="cardText">
        <span><strong>Pris:</strong> ${house.pricePerNight} kr/natt</span>
        <span><strong>Skräcknivå:</strong> ${scareLevelText(house.scareLevel)}</span>
        <span><strong>Spöktyper:</strong> ${house.ghostTypes.join(", ")}</span>
        <span><strong>WiFi:</strong> ${house.hasWifi ? "Ja" : "Nej"}</span>
      </div>
    </div>
  `;
}
//
function showMap(house) {
  const map = L.map("map").setView([house.coordinates.lat, house.coordinates.lng], 10);

//Visa kartan från streetmap genom openstreetmap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);

// Pinpointa vart på kartan huset är med en pil
  L.marker([house.coordinates.lat, house.coordinates.lng])
    .addTo(map)
    .bindPopup(house.name)
    .openPopup();


  fetchAddress(house.coordinates.lat, house.coordinates.lng);
}

// Hämtar koordinater från huset och skickar det till Nominatim för att få en adress
async function fetchAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    );
    const data = await response.json();
    const boxAdress = document.getElementById("address");
    boxAdress.textContent = data.display_name ?? "";
  } catch (error) {
    const boxAdress = document.getElementById("address");
    boxAdress.textContent = "Kunde inte hämta platsinformation.";
  }
}

function setupForm() {
  const form = document.getElementById("form");
  const checkin = document.getElementById("checkin");
  const days = document.getElementById("days");
  const addons = document.querySelectorAll("input[name='addon']");
  const promo = document.getElementById("promo");
  const totalEl = document.getElementById("total-price");

  const today = new Date().toISOString().split("T")[0];
  checkin.min = today;

  function updateTotal() {
    const checkedAddons = Array.from(addons).filter(a => a.checked);
    booking.update(checkin.value, Number(days.value), checkedAddons, promo.value);
    totalEl.textContent = booking.getTotal();
  }

  checkin.addEventListener("input", updateTotal);
  days.addEventListener("input", updateTotal);
  promo.addEventListener("input", updateTotal);
  for (const addon of addons) {
    addon.addEventListener("change", updateTotal);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const checkedAddons = Array.from(addons).filter(a => a.checked);
    booking.update(checkin.value, Number(days.value), checkedAddons, promo.value);

    const error = booking.validate();
    const errorsBox = document.getElementById("errors");

    if (error) {
      errorsBox.textContent = error;
      errorsBox.classList.remove("hidden");
      return;
    }

    errorsBox.classList.add("hidden");

    const confirmation = document.getElementById("confirmation");
    confirmation.textContent = "";
    confirmation.append(booking.makeConfirmation());
    confirmation.classList.remove("hidden");
  });
}

start();