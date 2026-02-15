const STORAGE_KEY = "u2_cart";

let cart = loadCart();

export function addToCart(product) {
  let found = null;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      found = cart[i];
      break;
    }
  }

  if (found) {
    found.quantity = found.quantity + 1;
  } else {
    cart.push({
      id: product.id,
      namn: product.namn,
      pris: product.pris,
      quantity: 1
    });
  }

  saveCart();
}

export function clearCart() {
  cart = [];
  localStorage.removeItem(STORAGE_KEY);
}

export function getCart() {
  return cart.slice();
}

export function getTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].pris * cart[i].quantity;
  }
  return total;
}


export function createProductCard(product, onAdd) {
  const card = document.createElement("article");
  card.classList.add("productsCard");

  const img = document.createElement("img");
  img.src = product.bild;
  img.alt = product.namn;

  const title = document.createElement("h3");
  title.textContent = product.namn;

  const desc = document.createElement("p");
  desc.classList.add("beskrivning");
  desc.textContent = product.beskrivning;

  const price = document.createElement("p");
  price.classList.add("pris");
  price.textContent = product.pris + " kr";

  const cat = document.createElement("span");
  cat.classList.add("kategori");
  cat.textContent = product.kategori;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("lägg-till-knapp");
  btn.textContent = "Lägg till";

  btn.addEventListener("click", function () {
    onAdd(product);
  });

  card.append(img, title, desc, price, cat, btn);
  return card;
}


function loadCart() {
  const text = localStorage.getItem(STORAGE_KEY);
  if (!text) return [];

  try {
    const data = JSON.parse(text);
    if (Array.isArray(data)) return data;
    return [];
  } catch (e) {
    return [];
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}
