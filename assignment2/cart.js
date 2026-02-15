import { products } from "./products.js";
import { createProductCard, addToCart, getCart, clearCart, getTotal } from "./shop.js";


const productsEl = document.getElementById("produkt-container");
const cartEl = document.getElementById("kundvagn-innehåll");
const totalEl = document.getElementById("total-summa");


totalEl.addEventListener("click", function () {
  clearCart();
  renderCart();
});

start();

function start() {
  renderProducts();
  renderCart();
}

function renderProducts() {
  productsEl.textContent = "";

  for (let i = 0; i < products.length; i++) {
    const card = createProductCard(products[i], function (product) {
      addToCart(product);
      renderCart();
    });

    productsEl.append(card);
  }
}

function renderCart() {
  cartEl.textContent = "";

  const cart = getCart();

  if (cart.length === 0) {
    const p = document.createElement("p");
    p.id = "tom-kundvagn";
    p.textContent = "Kundvagnen är tom";
    cartEl.append(p);

    totalEl.textContent = "0";
    return;
  }

  for (let i = 0; i < cart.length; i++) {
    const row = document.createElement("p");
    row.textContent = cart[i].namn + " x" + cart[i].quantity + " (" + cart[i].pris + " kr)";
    cartEl.append(row);
  }

  totalEl.textContent = String(getTotal());
}

const emptyCart = document.getElementById("kundvagn-footer");
const emptyBtn = document.createElement("button");
emptyBtn.id = "tom-kundvagn-knapp";
emptyBtn.type = "button";
emptyBtn.textContent = "Töm kundvagn";

emptyBtn.addEventListener("click", function () {
  clearCart();
  renderCart();
});

emptyCart.append(emptyBtn);
