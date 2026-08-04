async function loadProducts(dataFile, containerID, priceColorClass) {

const priceClass = priceColorClass || "text-green-700"

const res = await fetch(dataFile)
const products = await res.json()

const grid = document.getElementById(containerID)

products.forEach(product => {

grid.innerHTML += `

<a href="${product.url}"
class="block bg-white rounded-xl shadow hover:shadow-xl p-6">

<img src="${product.images[0]}" class="rounded mb-4">

<h3 class="text-xl font-bold">
${product.name}
</h3>

<p class="${priceClass} font-semibold">
$${product.price}
</p>

</a>

`

})

}
