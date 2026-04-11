async function loadProducts(dataFile, containerID) {

const res = await fetch(dataFile)
const products = await res.json()

const grid = document.getElementById(containerID)

products.forEach(product => {

grid.innerHTML += `

<a href="product.html?id=${product.id}"
class="block bg-white rounded-xl shadow hover:shadow-xl p-6">

<img src="${product.images[0]}" class="rounded mb-4">

<h3 class="text-xl font-bold">
${product.name}
</h3>

<p class="text-blue-700 font-semibold">
$${product.price}
</p>

</a>

`

})

}



async function loadComingSoon(dataFile, containerID){

const res = await fetch(dataFile)
const products = await res.json()

const grid = document.getElementById(containerID)

let html = ""

products.forEach(product => {

html += `

<div class="bg-white rounded-xl shadow p-6 text-center opacity-80">

// <img src="${product.images[0]}" class="rounded mb-4">


<h3 class="text-xl font-bold">
${product.name}
</h3>

<p class="text-gray-500 font-semibold">
Coming Soon
</p>

</div>

`

})

grid.innerHTML = html

}
