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

function buyItems() {
  if (cart.length === 0) {
    alert("Корзина порожня!");
    return;
  }

  // Створюємо модальне вікно
  const modal = document.createElement('div');
  modal.id = 'buy-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '1000';

  modal.innerHTML = `
    <div style="background-color:#fff; color:#000; padding:20px; border-radius:10px; width:300px; text-align:center;">
      <h3>Оформлення покупки</h3>
      <p>Введіть ваші дані:</p>
      <input type="text" id="buyer-name" placeholder="Ім'я" style="width:90%; margin:5px 0; padding:5px;">
      <input type="email" id="buyer-email" placeholder="Email" style="width:90%; margin:5px 0; padding:5px;">
      <input type="tel" id="buyer-phone" placeholder="Телефон" style="width:90%; margin:5px 0; padding:5px;">
      <br><br>
      <button id="confirm-buy" style="padding:8px 15px; border-radius:10px; background-color:#db1ab7; color:white; border:none; cursor:pointer;">Підтвердити</button>
      <button id="cancel-buy" style="padding:8px 15px; border-radius:10px; background-color:#999; color:white; border:none; cursor:pointer; margin-left:10px;">Відмінити</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('cancel-buy').onclick = () => {
    modal.remove();
  };

  document.getElementById('confirm-buy').onclick = () => {
    const name = document.getElementById('buyer-name').value.trim();
    const email = document.getElementById('buyer-email').value.trim();
    const phone = document.getElementById('buyer-phone').value.trim();

    if (!name || !email || !phone) {
      alert('Будь ласка, заповніть всі поля!');
      return;
    }

    alert(`Дякуємо за покупку, ${name}!\nВсього турів: ${cart.length}\nСума: ${cart.reduce((sum, i) => sum + i.price, 0)}₴`);
    cart.length = 0; // Очищаємо корзину
    renderCart();
    modal.remove();
  };
}


function toggleTheme() {
  document.body.classList.toggle('light-theme');
}


const toggle = document.querySelector('.toggle-input');
const initialState = localStorage.getItem('toggleState') == 'true';
toggle.checked = initialState;

toggle.addEventListener('change', function () {
  document.body.classList.toggle('light-theme');
});