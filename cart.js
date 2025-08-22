const cart = [];

function addToCart(tour) {
  cart.push(tour);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  const cartElement = document.getElementById('cart-items');
  cartElement.innerHTML = '';
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';

    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}₴ <button class="cart-remove-btn" onclick="removeFromCart(${index})">x</button></span>
    `;

    cartElement.appendChild(div);
  });
}
