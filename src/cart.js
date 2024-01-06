let ShoppingCart = document.getElementById("shopping-cart");
let label = document.getElementById("label");




let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();


let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || {};
        let { image, price, brand, model } = search;
        return `
          <div class="cart-item">
            <img width="100" src=${image} alt="${brand} ${model}" />
            <div class="details">
              <div class="title-price-x">
                <h4 class="title-price">
                  <p>${brand} ${model}</p>
                  <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <div class="cart-buttons">
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id=${id} class="quantity">${item}</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
              <h3>$ ${item * price}</h3>
            </div>
          </div>
        `;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = "";
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
      <button class="HomeBtn">Back to Home</button>
    </a>
    `;
  }
};


generateCartItems();

let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generateCartItems();
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};


let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined || search.item === 0) return;

  search.item -= 1;

  update(id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let generateShop = () => {
  alert("s")
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, brand, model, color, size, price, image, quantity, discription } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
        <div id=product-id-${id} class="item" onclick="showModal(${id})">
          <img width="220" src=${image} alt="${brand} ${model}">
          <!-- ... rest of your product card ... -->
        </div>
      `;
    })
    .join(""));
};

let showCartModal = () => {
  let cartModalBody = '';

  if (basket.length === 0) {
    cartModalBody = '<p>Your cart is empty.</p>';
  } else {
    cartModalBody = basket.map((x) => {
      const product = shopItemsData.find((y) => y.id === x.id);
      return `
        <div class="cart-modal-item">
          <img src="${product.image}" alt="${product.brand} ${product.model}" width="50">
          <p>${product.brand} ${product.model} - $${product.price} x ${x.item}</p>
        </div>
      `;
    }).join('');
  }

  document.getElementById('cartModalBody').innerHTML = cartModalBody;

  const modal = new bootstrap.Modal(document.getElementById('cartModal'));
  modal.show();
};


let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};


let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  calculation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};


let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
      <h2>Total Bill : $ ${amount}</h2>
      <button class="checkout" onclick="checkoutCart()">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else {
    label.innerHTML = "";
  }
};

TotalAmount();

let checkoutCart = () => {

  basket = [];

  localStorage.setItem("data", JSON.stringify(basket));

  ShoppingCart.innerHTML = "";

  label.innerHTML = "<h1>Thanks for choosing us. You will recive your shoes in a week!!</h1>";

  calculation();
};


let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};
