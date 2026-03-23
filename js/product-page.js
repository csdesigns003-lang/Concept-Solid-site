const params = new URLSearchParams(window.location.search)
const productID = params.get("id")

async function loadProduct() {

const res = await fetch("data/concept-products.json")
const products = await res.json()

const product = products.find(p => p.id === productID)

document.getElementById("product-name").innerText = product.name
document.getElementById("product-price").innerText = "$" + product.price
document.getElementById("product-description").innerText = product.description

const mainImage = document.getElementById("main-image")
mainImage.src = product.images[0]

const gallery = document.getElementById("image-gallery")

product.images.forEach(img => {

gallery.innerHTML += `

<img src="${img}" class="rounded cursor-pointer"
onclick="document.getElementById('main-image').src='${img}'">

`

})

document.getElementById("add-cart-btn").onclick = function(){

addToCart(product.id, product.price)

}

}

loadProduct()
