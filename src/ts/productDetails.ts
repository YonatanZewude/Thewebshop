import "./../scss/style.scss";
import { createAddToCartButton, createDetailsElement } from "./functions.ts";
import { Cart } from "./models/cart.ts";
import { Product } from "./models/product.ts";

export function createHtmlModal(cart: Cart, product: Product) {
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

    const brand = createDetailsElement("Brand", `${product.brand}`);

    const model = createDetailsElement("Model", `${product.model}`);

    const color = createDetailsElement("Color", `${product.color}`);

    const quantity = createDetailsElement("Quantity", `${product.quantity}`);

    const size = createSizeList(product);

    const price = createDetailsElement("Price", `${product.price} kr`);
    price.classList.add("product-price");

    const discription = createDetailsElement(
      "Discription",
      `${product.discription}`
    );

    const buttnAddToCart = createAddToCartButton(product);

    modalBody.appendChild(image);
    details.appendChild(brand);
    details.appendChild(model);
    details.appendChild(color);
    details.appendChild(quantity);
    details.appendChild(size);
    details.appendChild(price);
    details.appendChild(discription);
    details.appendChild(buttnAddToCart);
    modalBody.appendChild(details);

    handleAddToCart(cart, product);
  }
}

function createSizeList(product: Product) {
  const sizeElement = document.createElement("select");
  sizeElement.id = "sizeOption";

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "");
  const defaultText = document.createTextNode("Chosse your size ...");
  defaultOption.appendChild(defaultText);
  sizeElement.appendChild(defaultOption);

  for (let i = 0; i < product.sizes.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", String(product.sizes[i]));
    let text = document.createTextNode(String(product.sizes[i]));
    option.appendChild(text);
    sizeElement.appendChild(option);
  }

  document.body.appendChild(sizeElement);
  return sizeElement;
}
function handleAddToCart(cart: Cart, product: Product) {
  const cartIcon = document.getElementById("cartSpan");
  document.getElementById(String(product.id))?.addEventListener("click", () => {
    let size = (<HTMLSelectElement>document.getElementById("sizeOption")).value;

    if (size.length === 0) {
      alert("Please select size!");
      return;
    }

    console.log("selected size : ", size);
    console.log("Product before: ", product);
    let tempProduct = structuredClone(product);
    tempProduct.sizes.length = 0;
    tempProduct.sizes.push(Number(size));

    cart.products.set(
      JSON.stringify(tempProduct),
      increamentQunatity(cart, JSON.stringify(tempProduct))
    );

    cart.totalPrice = calculateTotalPrice(cart);
    let cartCount = getTotalCount(cart);
    if (cartIcon !== null) {
      cartIcon.innerHTML = `${cartCount}`;
    }

    const productElement = document.createElement("p");
    productElement.textContent = `Product ${cartCount}`;
  });
}

function calculateTotalPrice(cart: Cart) {
  let totalPrice = 0;
  cart.products.forEach((quantity, product) => {
    let p = JSON.parse(String(product));

    let subTotalPrice = p.price * quantity;
    console.log("Sub total Price for produce: ", p, subTotalPrice);
    totalPrice += subTotalPrice;
    console.log("Total Price for produce: ", p, totalPrice);
  });
  return totalPrice;
}

function increamentQunatity(cart: Cart, product: String) {
  let quantity = 1;
  if (cart.products.has(product)) {
    cart.products.forEach((q, p) => {
      if (p === product) {
        quantity = q + 1;
      }
    });
  }

  return quantity;
}
function getTotalCount(cart: Cart) {
  let totalCount = 0;
  cart.products.forEach((quantity, _) => (totalCount += quantity));
  return totalCount;
}
