let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product,price){

cart.push({product,price});

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

}

function updateCartCount(){

document.querySelectorAll(".cart-count").forEach(el=>{

el.textContent=cart.length;

})

}

function loadCart(){

let table=document.getElementById("cartTable");

if(!table) return;

cart.forEach(item=>{

let row=document.createElement("tr");

row.innerHTML=`

<td class="p-3">${item.product}</td>
<td class="p-3">$${item.price}</td>

`;

table.appendChild(row);

});

}

document.addEventListener("DOMContentLoaded",()=>{

updateCartCount();
loadCart();

});
