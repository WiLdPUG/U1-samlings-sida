export class Booking {
  #house;
  #checkin;
  #days;
  #addons;
  #promo;

  constructor(house) {
    this.#house = house;
    this.#checkin = "";
    this.#days = 1;
    this.#addons = [];
    this.#promo = "";
  }

  update(checkin, days, addons, promo) {
    this.#checkin = checkin;
    this.#days = days;
    this.#addons = addons;
    this.#promo = promo;
  }

  getTotal() {
    let total = this.#house.pricePerNight * this.#days;

    for (const addon of this.#addons) {
      const price = Number(addon.dataset.price);
      const value = addon.value;

      if (value === "breakfast") {
        total += price * this.#days;
      } else {
        total += price;
      }
    }

    if (this.#promo === "GHOST20") {
      total = total * 0.8;
    }

    return total;
  }

  validate() {
    if (!this.#checkin) {
      return "Du måste välja ett incheckningsdatum.";
    }

    if (!this.#days || this.#days < 1) {
      return "Antal dagar måste vara minst 1.";
    }

    return null;
  }

  makeConfirmation() {
    const total = this.getTotal();
    let addonText = "Inga";

    if (this.#addons.length > 0) {
      const names = [];

      for (const extra of this.#addons) {
        if (extra.value === "breakfast") names.push("Frukost");

        if (extra.value === "tour") names.push("Spökvandring");

        if (extra.value === "seance") names.push("Nattlig seans");
      }
      addonText = names.join(", ");
    }

    const box = document.createElement("div");
    box.innerHTML = `
    <h3>Bokning bekräftad!</h3>
    <p>Hus: ${this.#house.name}</p>
    <p>Incheckning: ${this.#checkin}</p>
    <p>Antal dagar: ${this.#days}</p>
    <p>Tillägg: ${addonText}</p>
    <p>Totalt pris: ${total} kr</p>
    <p>Tack för din bokning!</p>
  `;

    return box;
  }
}