const params = new URLSearchParams(window.location.search);
const productID = params.get("id");

async function loadProduct() {

const res = await fetch("data/concept-products.json");
const products = await res.json();

const product = products.find(p => p.id === productID);

if (!product) {
  console.error("Product not found:", productID);
  return;
}

// PRODUCT INFO
document.getElementById("product-name").innerText = product.name;
document.getElementById("product-price").innerText = "$" + product.price;

// DESCRIPTION
const descriptionContainer = document.getElementById("product-description");
descriptionContainer.innerHTML = "";

product.description.forEach(line => {

  if (line === "") {
    descriptionContainer.innerHTML += `<div class="h-4"></div>`;
  }

  else if (line === "FEATURES" || line === "HOW IT WORKS") {
    descriptionContainer.innerHTML += `<h3 class="text-xl font-semibold mt-6">${line}</h3>`;
  }

  else {
    descriptionContainer.innerHTML += `<p class="mb-2">${line}</p>`;
  }

});

// IMAGES
const mainImage = document.getElementById("main-image");
mainImage.src = product.images[0];

const gallery = document.getElementById("image-gallery");
gallery.innerHTML = "";

product.images.forEach(img => {
  gallery.innerHTML += `
    <img src="${img}" class="rounded cursor-pointer"
    onclick="document.getElementById('main-image').src='${img}'">
  `;
});


// NEW: Etsy button link
const buyBtn = document.getElementById("buy-btn")

if (product.etsyUrl) {
  buyBtn.href = product.etsyUrl
  buyBtn.target = "_blank" // opens Etsy in new tab
} else {
  // fallback if no Etsy link exists
  buyBtn.style.display = "none"
}
  
// ✅ CART BUTTON (FIXED)
document.getElementById("add-cart-btn").onclick = () => {
  addToCart(product);
};

}

loadProduct();
