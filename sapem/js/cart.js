let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART (FIXED STRUCTURE)
function addToCart(product, qty) {

qty = Math.max(1, parseInt(qty, 10) || 1);

let existing = cart.find(item => item.id === product.id);

if (existing) {
  existing.qty += qty;
} else {
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: qty
  });
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
}

// QUANTITY SELECTOR HELPERS (product pages)
function changeQty(delta) {
let input = document.getElementById("qty-input");
if (!input) return;
let val = Math.max(1, (parseInt(input.value, 10) || 1) + delta);
input.value = val;
}

function clampQty() {
let input = document.getElementById("qty-input");
if (!input) return;
input.value = Math.max(1, parseInt(input.value, 10) || 1);
}

function getQty() {
let input = document.getElementById("qty-input");
if (!input) return 1;
return Math.max(1, parseInt(input.value, 10) || 1);
}

// CART COUNT
function updateCartCount() {

document.querySelectorAll(".cart-count").forEach(el => {
  el.textContent = cart.length;
});

}

// OPTIONAL TABLE VIEW (SAFE)
function loadCart() {

let table = document.getElementById("cartTable");
if (!table) return;

cart.forEach(item => {

let row = document.createElement("tr");

row.innerHTML = `
<td class="p-3">${item.name}</td>
<td class="p-3">$${item.price}</td>
`;

table.appendChild(row);

});

}

document.addEventListener("DOMContentLoaded", () => {
updateCartCount();
loadCart();
});
