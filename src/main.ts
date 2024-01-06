let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];

function showCartModal () {
  const cartIcon = document.getElementById('cartIcon');
  if (cartIcon) {
alert("s")
  } else {
      console.error("Cart icon element not found!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showCartModal ();
});

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, brand, model, color, size, price, image, quantity, discription } = x;
      return `
        <div id=product-id-${id} class="item" onclick="showModal(${id})">
          <img width="220" src=${image} alt="${brand} ${model}">
          <div class="details">
            <h3>${brand} ${model}</h3>
            <div class="color-size">
              <span>Color: ${color}</span><br>
              <span>Size: ${size.join(", ")}</span>
            </div>
            <div class="price-quantity">
              <h2>$ ${price} </h2>
              <div class="buttons">
                <i onclick="decrement(${id}); event.stopPropagation();" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${basket.find((y) => y.id === id)?.item || 0}</div>
                <i onclick="increment(${id}); event.stopPropagation();" class="bi bi-plus-lg"></i>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join(""));
};

generateShop();

const showModal = (id) => {
  let product = shopItemsData.find(x => x.id === id);
  if (!product) return;

  document.getElementById('modalTitle').textContent = `${product.brand} ${product.model}`;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalDescription').textContent = product.discription;

  var modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
};

let increment = (id) => {
  let search = basket.find((x) => x.id === id);

  if (!search) {
    basket.push({ id: id, item: 1 });
  } else {
    search.item += 1;
  }

  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let search = basket.find((x) => x.id === id);

  if (!search || search.item === 0) return;

  search.item -= 1;

  update(id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
