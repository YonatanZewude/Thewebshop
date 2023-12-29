import axios from "axios";
import { Product } from "./models/product.ts";
import { createProductCard } from "./main.ts";

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

function displayProducts(products: Array<Product>) {
  const productContainer = document.getElementById("product-container");

  products.forEach((product) => {
    const card = createProductCard(product);
    productContainer?.appendChild(card);
  });
}
