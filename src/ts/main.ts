// Import necessary modules and styles
import * as bootstrap from "bootstrap";
import "./../scss/style.scss";
import { Product } from "./models/product.ts";
import { createHtmlModal } from "./productDetails.ts";
import { getProductById } from "./functions.ts";
import { getProductsFromJson } from "./functions.ts";
import { createDetailsElement } from "./functions.ts";

export function createProductCard(product: Product) {
  const card = document.createElement("div");
  card.classList.add("product");

  const details = document.createElement("div");
  details.classList.add("product__details");

  details.appendChild(createDetailsElement("Brand", product.brand));
  details.appendChild(createDetailsElement("Model", product.model));

  const price = createDetailsElement("Price", `${product.price.toFixed(0)} kr`);
  price.classList.add("product__price");
  price.id = "ashu";
  details.appendChild(price);

  const AddToCart: HTMLButtonElement = document.createElement("button");
  AddToCart.textContent = "Add To Cart";
  AddToCart.addEventListener("click", () => {
    alert("Button clicked!");
  });
  AddToCart.id = "AddToCart";

  details.appendChild(AddToCart);

  const image = document.createElement("img");
  image.classList.add("product__image");
  image.src = product.imageUrl;
  image.alt = product.model;

  console.log("Product:", product);

  const handleClick = async () => {
    try {
      // kolla upp om produkt är inte  null
      if (product.id != null) {
        const productDetails = await getProductById(product.id);
        console.log("Product details:", productDetails);

        createHtmlModal(product);
        console.log(product);

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

  card.addEventListener("click", handleClick);

  card.appendChild(image);
  card.appendChild(details);

  return card;
}

// const productsData: any[] = [];

// const products = productsData.map(
//   (data: any) =>
//     new Product(
//       data.id,
//       data.brand,
//       data.model,
//       data.color,
//       data.size,
//       data.price,
//       data.imageUrl,
//       data.quantity,
//       data.discription
//     )
// );

// console.log(products);

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
