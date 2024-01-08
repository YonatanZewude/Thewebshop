import { ShopItem, BasketItem } from "./interface/data";
import * as bootstrap from 'bootstrap'


const ShoppingCart: HTMLElement | null = document.getElementById("shopping-cart");
const label: HTMLElement | null = document.getElementById("label");
let basket: BasketItem[] = JSON.parse(localStorage.getItem("data") || "[]");

const calculation = (): void => {
  const cartIcon: HTMLElement | null = document.getElementById("cartAmount");
  if (cartIcon) {
    cartIcon.innerHTML = basket.map(x => x.item).reduce((x, y) => x + y, 0).toString();
  }
  TotalAmount();
};

const generateCartItems = (): void => {
  if (basket.length !== 0) {
    fetch('./src/Data.json')
      .then(response => response.json())
      .then((data: ShopItem[]) => {
        if (ShoppingCart) {
          ShoppingCart.innerHTML = basket.map(x => {
            const { id, item } = x;
            const product = data.find(y => y.id === id) || null;
            if (product) {
              const { image, price, brand, model } = product;
              return `
                <div class="cart-item">
                  <img width="100" src="${image}" alt="${brand} ${model}" />
                  <div class="details">
                    <div class="title-price-x">
                      <h4 class="title-price">
                        <p>${brand} ${model}</p>
                        <p class="cart-item-price">$ ${price}</p>
                      </h4>
                      <!-- Removed the 'X' icon line here -->
                    </div>
                    <div class="cart-buttons">
                      <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id="quantity-${id}" class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                      </div>
                    </div>
                    <h3>$ ${item * price}</h3>
                  </div>
                </div>
              `;
            }
            return '';
          }).join("");
        }
      });
  } else {
    if (ShoppingCart) ShoppingCart.innerHTML = "";
    if (label) label.innerHTML = "<h2>Cart is Empty</h2><a href='index.html'><button class='HomeBtn'>Back to Home</button></a>";
  }
};




const increment = (id: number): void => {
  const search = basket.find(x => x.id === id);
  if (!search) {
    basket.push({ id, item: 1 });
  } else {
    search.item++;
  }
  updateCart(id);
};



const decrement = (id: number): void => {
  const search = basket.find(x => x.id === id);
  if (search && search.item > 1) {
    search.item--;
  } else {
    basket = basket.filter(x => x.id !== id);
  }
  updateCart(id);
};

const updateCart = (id: number): void => {
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
  generateCartItems();
};

const TotalAmount = (): void => {
  if (basket.length !== 0) {
    fetch('./src/Data.json')
      .then(response => response.json())
      .then((data: ShopItem[]) => {
        const amount = basket.map(x => {
          const { id, item } = x;
          const product = data.find(y => y.id === id);
          return product ? product.price * item : 0;
        }).reduce((x, y) => x + y, 0);
        if (label) label.innerHTML = "<h2>Total Bill : $ " + amount + "</h2><button class='checkout' onclick='checkoutCart()'>Checkout</button><button onclick='clearCart()' class='removeAll'>Clear Cart</button>";
      });
  } else {
    if (label) label.innerHTML = "";
  }
};

const clearCart = (): void => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  if (ShoppingCart) ShoppingCart.innerHTML = "<h2>Cart is Empty</h2>";
  if (label) label.innerHTML = "";
  calculation();
};

const checkoutCart = (): void => {
  basket = [];
  localStorage.setItem("data", JSON.stringify(basket));
  if (ShoppingCart) ShoppingCart.innerHTML = "<h1>Thank you for your purchase! You will get your items in approximately 3 days.</h1>";
  if (label) label.innerHTML = "";
  calculation();
};


calculation();
generateCartItems();
