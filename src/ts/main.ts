import * as bootstrap from "bootstrap";
import "./../scss/style.scss";
import { Product } from "./models/product.ts";
import { createHtmlModal } from "./productDetails.ts";
import { getProductById, getProductsFromJson } from "./functions.ts";
import { createDetailsElement } from "./functions.ts";
import { Cart } from "./models/cart.ts";

document.addEventListener("DOMContentLoaded", function () {
  const navTitle = document.querySelector(".nav-title");

  if (navTitle) {
    navTitle.addEventListener("click", function () {
      window.location.href = "/index.html";
    });
  }
});

let cart = new Cart(new Map(), 0);

export function createProductCard(product: Product) {
  const card = document.createElement("div");
  card.classList.add("product");

  const details = document.createElement("div");
  details.classList.add("product__details");

  details.appendChild(createDetailsElement("Brand", product.brand));
  details.appendChild(createDetailsElement("Model", product.model));

  const price = createDetailsElement("Price", `${product.price} kr`);
  price.classList.add("product__price");
  price.id = "productPrice";
  details.appendChild(price);

  const image = document.createElement("img");
  image.classList.add("product__image");
  image.src = product.imageUrl;
  image.alt = product.model;

  const handleClick = modalHandler(product);

  card.addEventListener("click", handleClick);

  card.appendChild(image);
  card.appendChild(details);

  return card;
}

getProductsFromJson();

document.addEventListener("ScrollUpToTop", function () {
  const scrollUpButton = document.querySelector(".scrollUpButton");

  if (scrollUpButton) {
    scrollUpButton.addEventListener("click", scrollToTop);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});
document.dispatchEvent(new Event("ScrollUpToTop"));

function modalHandler(product: Product) {
  return async () => {
    try {
      if (product.id != null) {
        await getProductById(product.id);
        createHtmlModal(cart, product);

        const modalElement = document.getElementById("exampleModal");
        if (modalElement) {
          const myModal = new bootstrap.Modal(modalElement);
          myModal.show();
        } else {
          alert("Product not found");
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
}
