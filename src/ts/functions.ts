import axios from "axios";
import { Product } from "./models/product.ts";
import { createProductCard } from "./main.ts";
import { Cart } from "./models/cart.ts";

export async function getProductById(id: number) {
  try {
    const response = await axios.get(`./src/test.json?id=${id}`);
    console.log("Product details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

function displayProducts(products: Array<Product>) {
  const productContainer = document.getElementById("product-container");
  products.forEach((product) =>
    productContainer?.appendChild(createProductCard(product))
  );
}

export function getProductsFromJson() {
  fetch("./src/test.json")
    .then((response) => response.json())
    .then((products) => {
      const productsList = products.map(
        (val: any) =>
          new Product(
            val.id,
            val.brand,
            val.model,
            val.color,
            val.size,
            val.price,
            val.image,
            val.quantity,
            val.discription
          )
      );

      displayProducts(productsList);
    })
    .catch((error) => console.error("Error fetching products:", error));
}

export const createDetailsElement = (
  label: string,
  value: string | number
): HTMLParagraphElement => {
  const p: HTMLParagraphElement = document.createElement("p");
  p.innerHTML = `<strong>${label}:</strong> ${value}`;
  return p;
};

export function createAddToCartButton(product: Product) {
  const addToCart: HTMLButtonElement = document.createElement("button");
  addToCart.textContent = "Add To Cart";
  addToCart.id = String(product.id);
  addToCart.classList.add("addToCart");

  return addToCart;
}

export function saveCartToLocalStorage(cart: Cart) {
  const productsArray = Array.from(cart.products.entries());
  const cartObject = {
    products: productsArray,
    totalPrice: cart.totalPrice,
  };
  const jsonString = JSON.stringify(cartObject);

  localStorage.setItem("cart", jsonString);
}

export function loadDataFromLocalStorage(key: string) {
  const storedJsonString = localStorage.getItem(key);

  if (!storedJsonString) {
    console.error(`Unable to load cart data from local storage`);
    return null;
  }
  const storedCartObject = JSON.parse(storedJsonString) as Cart;
  const storedProductsMap = new Map(storedCartObject.products);
  return new Cart(storedProductsMap, storedCartObject.totalPrice);
}

export function getTotalCount(cart: Cart) {
  let totalCount = 0;
  cart.products.forEach((quantity, _) => (totalCount += quantity));
  return totalCount;
}
