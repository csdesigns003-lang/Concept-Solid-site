let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART (FIXED STRUCTURE)
function addToCart(product) {

let existing = cart.find(item => item.id === product.id);

if (existing) {
  existing.qty += 1;
} else {
  cart.push({
    id: product.id,
    qty: 1
  });
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
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
