import { createDetailsElement } from "./functions.ts";
import { Product } from "./models/product.ts";
import "./../scss/style.scss";
import { Cart } from "./models/cart.ts";

function createProductCardforCart() {
  // Retrieve product details from local storage using the product ID
  const cartFromLocalStorage = localStorage.getItem("cart");

  if (!cartFromLocalStorage) {
    console.error(`Product details not found for ID: ${cartFromLocalStorage}`);
    return null; // Return null if product details are not found
  }

  // Retrieve the JSON string from local storage
  const storedJsonString = localStorage.getItem("cart");

  if (storedJsonString) {
    // Parse the JSON string to an object
    const storedCartObject = JSON.parse(storedJsonString) as Cart;

    // Convert the array representation of the Map back to a Map object
    const storedProductsMap = new Map(storedCartObject.products);

    // Create a new Cart instance
    const storedCart = new Cart(storedProductsMap, storedCartObject.totalPrice);

    // Now, storedCart is an instance of the Cart class
    console.log(storedCart);
  } else {
    console.error("No cart data found in local storage.");
  }

  //   const card = document.createElement("div");
  //   card.classList.add("product");

  //   const details = document.createElement("div");
  //   details.classList.add("product__details");

  //   details.appendChild(createDetailsElement("Brand", product.brand));
  //   details.appendChild(createDetailsElement("Model", product.model));

  //   const price = createDetailsElement("Price", `${product.price} kr`);
  //   price.classList.add("product__price");
  //   price.id = "productPrice";
  //   details.appendChild(price);

  //   const image = document.createElement("img");
  //   image.classList.add("product__image");
  //   image.src = product.imageUrl;
  //   image.alt = product.model;

  //   const handleClick = modalHandler(product);

  //   card.addEventListener("click", handleClick);

  //   card.appendChild(image);
  //   card.appendChild(details);

  return "card";
}
createProductCardforCart();
// Example of modalHandler function (replace this with your actual implementation)
function modalHandler(product: Product) {
  return () => {
    console.log("Clicked on product:", product);
    // Implement your modal handling logic here
  };
}
