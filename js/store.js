const products = [

{
id:1,
name:"SapEM Pressure Sensor",
price:249,
image:"images/sensor.jpg"
},

{
id:2,
name:"LoRa Gateway",
price:199,
image:"images/gateway.jpg"
},

{
id:3,
name:"Bike Tool",
price:49,
image:"images/tool.jpg"
}

]

function renderProducts(){

let grid = document.getElementById("productGrid")

products.forEach(p=>{

grid.innerHTML += `
<div class="bg-white p-6 shadow rounded">

<img src="${p.image}" class="mb-4">

<h3 class="font-bold text-lg">${p.name}</h3>

<p class="text-gray-600">$${p.price}</p>

<button onclick="addToCart(${p.id})"
class="bg-blue-600 text-white px-4 py-2 mt-3 rounded">
Add to Cart
</button>

</div>
`

})

}

function addToCart(id){

let cart = JSON.parse(localStorage.getItem("cart")||"[]")

cart.push(id)

localStorage.setItem("cart",JSON.stringify(cart))

alert("Added to cart")

}

renderProducts()
