import "./../scss/style.scss";
import { Product } from "./models/product.ts";

export function createHtmlModal(product: Product) {
  const modalBody = document.getElementById("modal-body");
  const modalTitle = document.getElementById("exampleModalLabel");

  if (modalBody && modalTitle) {
    modalBody.innerHTML = "";
    modalTitle.innerHTML = product.brand;

    const image = document.createElement("img");
    image.classList.add("product-image");
    image.src = product.imageUrl;
    image.alt = product.model;

    const details = document.createElement("div");
    details.classList.add("product-details");

    const brand = document.createElement("p");
    brand.innerHTML = `<strong>Brand:</strong> ${product.brand}`;

    const model = document.createElement("p");
    model.innerHTML = `<strong>Model:</strong> ${product.model}`;

    const color = document.createElement("p");
    color.innerHTML = `<strong>Color:</strong> ${product.color}`;

    const quantity = document.createElement("p");
    quantity.innerHTML = `<strong>Quantity:</strong> ${product.quantity}`;

    const size = document.createElement("p");
    size.innerHTML = `<strong>Size:</strong> ${product.size}`;

    const price = document.createElement("p");
    price.classList.add("product-price");

    price.innerHTML = `<strong>Price:</strong> ${
      product.price ? product.price.toFixed(0) : "N/A"
    } kr`;

    modalBody.appendChild(image);
    details.appendChild(brand);
    details.appendChild(model);
    details.appendChild(color);
    details.appendChild(quantity);
    details.appendChild(size);
    details.appendChild(price);
    modalBody.appendChild(details);
  }
}
