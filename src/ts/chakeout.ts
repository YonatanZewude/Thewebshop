import "./../scss/style.scss";
import { createDetailsElement, getTotalCount } from "./functions";
import { Cart } from "./models/cart";

document.addEventListener("DOMContentLoaded", () => {
  const submit = document.getElementById("submit");
  const messageContainer = document.getElementById("message");
  const myForm = document.getElementById("checkout-form") as HTMLFormElement;

  if (submit && messageContainer && myForm) {
    submit.addEventListener("click", () =>
      handleCheckout(myForm, messageContainer)
    );
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const orderSummary = document.getElementById("orderSummary");
  const totalElement = document.createElement("span");

  const cart = loadDataFromLocalStorage("cart");

  if (cart) {
    const totalCount = getTotalCount(cart);
    const totalCountElement = createDetailsElement(
      "Total products ",
      `${totalCount}`
    );
    totalElement.innerHTML = `Total Price ${cart.totalPrice} kr`;
    orderSummary?.appendChild(totalCountElement);
  } else {
    totalElement.innerHTML = "Your cart is empty";
  }
  orderSummary?.appendChild(totalElement);
});

function handleCheckout(
  myForm: HTMLFormElement,
  messageContainer: HTMLElement | null
) {
  if (myForm.checkValidity()) {
    const fullName = (myForm.elements.namedItem("fullName") as HTMLInputElement)
      ?.value;
    const email = (myForm.elements.namedItem("email") as HTMLInputElement)
      ?.value;
    const address = (myForm.elements.namedItem("address") as HTMLInputElement)
      ?.value;
    const paymentMethod = (
      myForm.elements.namedItem("paymentMethod") as HTMLSelectElement
    )?.value;

    if (hasProductsInCart()) {
      const order = {
        fullName,
        email,
        address,
        paymentMethod,
      };

      performCheckout(order);
    } else {
      displayErrorMessage(
        messageContainer,
        "Your cart is empty. Add items before checking out."
      );
    }
  } else {
    displayErrorMessage(
      messageContainer,
      "Please fill in all the required fields."
    );
  }
  localStorage.clear();
}

function hasProductsInCart(): boolean {
  const cartFromLocalStorage = loadDataFromLocalStorage("cart");
  return cartFromLocalStorage ? cartFromLocalStorage.products.size > 0 : false;
}

function performCheckout(order: any) {
  console.log("Order placed successfully:", order);

  const messageContainer = document.getElementById("message");
  if (messageContainer) {
    displaySuccessMessage(messageContainer, "Order placed successfully!");
  }
}

function displaySuccessMessage(
  messageContainer: HTMLElement | null,
  message: string
) {
  if (messageContainer) {
    messageContainer.innerHTML = message;
    messageContainer.classList.remove("error-message");
    messageContainer.classList.add("success-message");
  }
}

function displayErrorMessage(
  messageContainer: HTMLElement | null,
  message: string
) {
  if (messageContainer) {
    messageContainer.innerHTML = message;
    messageContainer.classList.remove("success-message");
    messageContainer.classList.add("error-message");
  }
}

function loadDataFromLocalStorage(key: string) {
  const storedJsonString = localStorage.getItem(key);

  if (!storedJsonString) {
    console.error(`Unable to load cart data from local storage`);
    return null;
  }

  const storedCartObject = JSON.parse(storedJsonString) as Cart;

  const storedProductsMap = new Map(storedCartObject.products);

  return new Cart(storedProductsMap, storedCartObject.totalPrice);
}
