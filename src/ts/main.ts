// Import necessary modules and styles
import * as bootstrap from "bootstrap";
import "./../scss/style.scss";
import { Product } from "./models/product.ts";
import { createHtmlModal } from "./productDetails.ts";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function createProductCard(product: Product) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  const createDetailsElement = (label: string, value: string | number) => {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${label}:</strong> ${value}`;
    return p;
  };

  const details = document.createElement("div");
  details.classList.add("product-details");

  details.appendChild(createDetailsElement("Brand", product.brand));
  details.appendChild(createDetailsElement("Model", product.model));

  const price = createDetailsElement("Price", product.price.toFixed(0));
  price.classList.add("product-price");
  details.appendChild(price);

  const AddToCart: HTMLButtonElement = document.createElement("button");
  AddToCart.textContent = "Add To Cart";
  AddToCart.addEventListener("click", () => {
    alert("Button clicked!");
  });
  AddToCart.id = "AddToCart";

  details.appendChild(AddToCart);

  const image = document.createElement("img");
  image.classList.add("product-image");
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
          console.error("Modal element not found");
        }
      } else {
        console.error("Product ID is null or undefined");
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

const productsData: any[] = [];

const products = productsData.map(
  (data: any) =>
    new Product(
      data.id,
      data.brand,
      data.model,
      data.color,
      data.size,
      data.price,
      data.imageUrl,
      data.quantity,
      data.discription
    )
);

console.log(products);

function displayProducts(products: Array<Product>) {
  const productContainer = document.getElementById("product-container");

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer?.appendChild(card);
  });
}

function getProductsFromJson() {
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

async function getProductById(id: number) {
  try {
    const response = await axios.get(`./src/test.json?id=${id}`);
    console.log("Product details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
}

getProductsFromJson();
