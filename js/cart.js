const cartButton = document.getElementById("cartButton")
const preview = document.getElementById("cartPreview")

cartButton.addEventListener("mouseover", () => {

preview.classList.remove("hidden")

})

preview.addEventListener("mouseleave", () => {

preview.classList.add("hidden")

})
