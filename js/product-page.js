const params = new URLSearchParams(window.location.search)
const productID = params.get("id")

async function loadProduct() {

const res = await fetch("data/concept-products.json")
const products = await res.json()

const product = products.find(p => p.id === productID)
document.getElementById("add-cart-btn").onclick = () => {
  addToCart(product);
};

document.getElementById("product-name").innerText = product.name
document.getElementById("product-price").innerText = "$" + product.price

const descriptionContainer = document.getElementById("product-description")

product.description.forEach(line => {

if(line === ""){
descriptionContainer.innerHTML += `<div class="h-4"></div>`
}

else if(line === "FEATURES" || line === "HOW IT WORKS"){
descriptionContainer.innerHTML += `<h3 class="text-xl font-semibold mt-6">${line}</h3>`
}

else{
descriptionContainer.innerHTML += `<p class="mb-2">${line}</p>`
}

})
  

const mainImage = document.getElementById("main-image")
mainImage.src = product.images[0]

const gallery = document.getElementById("image-gallery")

product.images.forEach(img => {

gallery.innerHTML += `

<img src="${img}" class="rounded cursor-pointer"
onclick="document.getElementById('main-image').src='${img}'">

`

})


}

loadProduct()
