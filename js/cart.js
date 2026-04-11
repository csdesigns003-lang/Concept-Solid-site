function addToCart(product){

let existing = cart.find(item => item.id === product.id);

if(existing){
  existing.qty += 1;
} else {
  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    qty: 1
  });
}

localStorage.setItem("cart", JSON.stringify(cart));

updateCartCount();
}
