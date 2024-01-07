import "./../scss/style.scss";
import { Cart } from "./models/cart.ts";

function createProductCardforCart() {
  const cartFromLocalStorage = loadDataFromLocalStorage("cart");
  if (cartFromLocalStorage) {
    cartFromLocalStorage.products.forEach((quantity, productFromMap) => {
      let product = JSON.parse(String(productFromMap));
      product.price;
      product.imageUrl;
      product.brand;

      let subtTotalPrice = quantity * product.price;
      //TODO ... TO be continued
    });
  }
}

function loadDataFromLocalStorage(key: string) {
  const storedJsonString = localStorage.getItem(key);

  if (!storedJsonString) {
    console.error(`Unable to load cart data from localstorage`);
    return null;
  }

  const storedCartObject = JSON.parse(storedJsonString) as Cart;

  const storedProductsMap = new Map(storedCartObject.products);

  return new Cart(storedProductsMap, storedCartObject.totalPrice);
}

createProductCardforCart();
