import * as bootstrap from 'bootstrap';
import { ShopItem, BasketItem } from "./interface/data";


const shop = document.getElementById("shop") as HTMLElement;
let basket: BasketItem[] = JSON.parse(localStorage.getItem("data") || "[]");

function showCartModal(): void {
  const cartIcon = document.getElementById('cartIcon');
  if (!cartIcon) {
    console.error("Cart icon element not found!");
  }
}

let shopItemsData: ShopItem[] = [];

const generateShop = async (): Promise<void> => {
  try {
    const response = await fetch('./src/Data.json');
    shopItemsData = await response.json();

    if (shop) {
      shop.innerHTML = shopItemsData.map((x: ShopItem) => {
        let { id, brand, model, color, size, price, image } = x;
        return `
          <div id="product-id-${id}" class="item">
            <img width="220" src="${image}" alt="${brand} ${model}">
            <div class="details">
              <h3>${brand} ${model}</h3>
              <div class="color-size">
                <span>Color: ${color}</span><br>
                <span>Size: ${size.join(", ")}</span>
              </div>
              <div class="price-quantity">
                <h2>$${price}</h2>
                <div class="buttons">
                  <i onclick="decrement(${id}); event.stopPropagation();" class="bi bi-dash-lg"></i>
                  <div id="${id}" class="quantity">${basket.find((y) => y.id === id)?.item || 0}</div>
                  <i onclick="increment(${id}); event.stopPropagation();" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");

      shopItemsData.forEach((item: ShopItem) => {
        const productElement = document.getElementById(`product-id-${item.id}`);
        if (productElement) {
          productElement.addEventListener('click', () => showModal(item.id));
        }
      });
    }
  } catch (error) {
    console.error('Error fetching shop data:', error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  generateShop();
  showCartModal();
});

const showModal = (id: number): void => {
  console.log("Opening modal for product ID:", id);
  const product = shopItemsData.find(x => x.id === id);
  if (!product) {
    console.error(`Product with id ${id} not found!`);
    return;
  }

  const modalTitle = document.getElementById('modalTitle') as HTMLElement | null;
  const modalBody = document.getElementById('modalBody') as HTMLElement | null;

  if (modalTitle && modalBody) {
    modalTitle.textContent = `${product.brand} ${product.model}`;

    modalBody.innerHTML = '';
    modalBody.appendChild(createDetailsElement('Color', product.color));
    modalBody.appendChild(createDetailsElement('Size', product.size.join(", ")));
    modalBody.appendChild(createDetailsElement('Price', `$${product.price}`));
    modalBody.appendChild(createDetailsElement('Description', product.description));

    const modalElement = document.getElementById('productModal') as HTMLElement | null;
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement, {
        keyboard: true
      });
      modal.show();
    } else {
      console.error('Modal element not found!');
    }
  } else {
    console.error('One or more modal elements were not found!');
  }
};


function createDetailsElement(label: string, value: string | number): HTMLParagraphElement {
  const p: HTMLParagraphElement = document.createElement("p");
  p.innerHTML = `<strong>${label}:</strong> ${value}`;
  return p;
}

(window as any).increment = (id: number): void => {
  let search = basket.find((x) => x.id === id);
  if (!search) {
    basket.push({ id: id, item: 1 });
  } else {
    search.item += 1;
  }
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

(window as any).decrement = (id: number): void => {
  let search = basket.find((x) => x.id === id);
  if (!search || search.item === 0) return;
  search.item -= 1;
  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id: number): void => {
  let search = basket.find((x) => x.id === id);
  if (search) {
    const quantityElement = document.getElementById(id.toString());
    if (quantityElement) {
      quantityElement.innerHTML = search.item.toString();
    }
  }
  calculation();
};

let calculation = (): void => {
  let cartIcon = document.getElementById("cartAmount");
  if (cartIcon) {
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0).toString();
  }
};

calculation();
