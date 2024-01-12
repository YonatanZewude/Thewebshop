import "./../scss/style.scss";
import {
  createDetailsElement,
  loadDataFromLocalStorage,
  saveCartToLocalStorage,
} from "./functions.ts";
import { Cart } from "./models/cart.ts";
import { Product } from "./models/product.ts";

function createProductCardforCart() {
  const cartFromLocalStorage = loadDataFromLocalStorage("cart");
  if (!cartFromLocalStorage) {
    return;
  }

  let totalPrice = cartFromLocalStorage.totalPrice;
  const container = document.getElementById("container");

  const totalElement = createDetailsElement("Total Price", `${totalPrice} kr`);
  totalElement.classList.add("totalPrice");

  if (container) {
    cartFromLocalStorage.products.forEach((quantity, productFromMap) => {
      const cartContainer = document.createElement("div");
      cartContainer.classList.add("cart-container");
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");
      const productDetails = document.createElement("div");
      productDetails.classList.add("productdetails");

      let product = JSON.parse(String(productFromMap));
      const brand = createDetailsElement("Brand", `${product.brand}`);

      const image = document.createElement("img");
      image.classList.add("productImage");
      image.src = product.imageUrl;
      image.alt = "product image";

      const price = createDetailsElement("Price", `${product.price} kr`);
      const size = createDetailsElement("Size", `${product.sizes[0]}`);
      let subtTotalPrice = quantity * product.price;
      const subtotal = createDetailsElement("Subtotal", `${subtTotalPrice} kr`);
      subtotal.classList.add("subtotal");
      subtotal.innerHTML = `Subtotal price: ${subtTotalPrice} kr`;

      const deleteButton = document.createElement("button");
      deleteButton.classList.add("deleteButton");
      deleteButton.innerHTML = "Remove";

      deleteButton.addEventListener("click", () => {
        cartFromLocalStorage.products.delete(productFromMap);
        let tPrice = 0;
        cartFromLocalStorage.products.forEach(
          (q, p) => (tPrice += q * JSON.parse(String(p)).price)
        );
        totalElement.innerHTML = `Total Price: ${tPrice} kr`;
        cartContainer.remove();
        cartFromLocalStorage.totalPrice = tPrice;
        saveCartToLocalStorage(cartFromLocalStorage);
        if (tPrice === 0) {
          localStorage.clear();
        }
      });

      const productQuantity = createQuantityList(quantity);

      productQuantity.addEventListener("change", () => {
        const selectedValue = parseInt(productQuantity.value, 10);
        cartFromLocalStorage.products.set(productFromMap, selectedValue);
        let updatedSubtotal = selectedValue * product.price;
        subtotal.innerHTML = `Subtotal price: ${updatedSubtotal} kr`;
        calculateUpdatedTotalPrice(
          cartFromLocalStorage,
          product,
          updatedSubtotal
        );
        totalElement.innerHTML = `Total Price ${cartFromLocalStorage.totalPrice} kr`;
        saveCartToLocalStorage(cartFromLocalStorage);
      });

      imgContainer?.appendChild(image);
      productDetails?.appendChild(brand);
      productDetails?.appendChild(size);
      productDetails?.appendChild(price);
      productDetails.appendChild(productQuantity);
      cartContainer?.appendChild(imgContainer);
      cartContainer?.appendChild(productDetails);
      cartContainer?.appendChild(subtotal);
      cartContainer?.appendChild(deleteButton);

      container.appendChild(cartContainer);
    });

    const checkout = document.createElement("Button");
    checkout.classList.add("checkout");
    checkout.innerHTML = "Checkout";

    checkout.addEventListener("click", function () {
      window.location.href = "checkout.html";
    });

    container?.appendChild(totalElement);
    container.appendChild(checkout);
  }
}

function createQuantityList(selectedQuantity: number) {
  const quantityElement = document.createElement("select");
  quantityElement.id = "quantityOption";
  for (let i = 1; i <= 10; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", String(i));
    let text = document.createTextNode(String(i));
    option.appendChild(text);

    if (i === selectedQuantity) {
      option.setAttribute("selected", "selected");
    }
    quantityElement.appendChild(option);
  }
  return quantityElement;
}

createProductCardforCart();
function calculateUpdatedTotalPrice(
  cart: Cart,
  selectProduct: Product,
  updatedSubtotal: number
) {
  let updatedTotalPrice = 0;

  cart.products.forEach((quantity, p) => {
    let product = JSON.parse(String(p));
    let subtotal = 0;
    if (p === JSON.stringify(selectProduct)) {
      subtotal += updatedSubtotal;
    } else {
      subtotal += quantity * product.price;
    }

    updatedTotalPrice += subtotal;
  });

  cart.totalPrice = updatedTotalPrice;
}
