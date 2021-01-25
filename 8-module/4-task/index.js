import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this._modal = null;

    this.addEventListeners();
  }

  addProduct(product) {
    let cartItem = this.cartItems.find(
      (item) => item.product.name === product.name
    );

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);

    if (!cartItem) {
      return;
    }
    cartItem.count += amount;

    if (cartItem.count === 0) {
      const newArr = [];
      this.cartItems.forEach((item) => {
        if (item !== cartItem) {
          newArr.push(item);
        }
      });
      this.cartItems = newArr;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    const isEmpty = this.cartItems.length === 0;

    return isEmpty;
  }

  getTotalCount() {
    let totalCount = 0;
    this.cartItems.forEach((item) => (totalCount += item.count));

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(
      (item) => (totalPrice += item.product.price * item.count)
    );

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    this._modal = modal;
    modal.setTitle("Your order");

    modal.setBody(this._getLayoutOfCart());
    modal.open();

    this._modal._elem.addEventListener("click", (e) => this._listenerOfModal(e));

    const formOfModal = modal._elem.querySelector(`.cart-form`);
    formOfModal.addEventListener("submit", (e) => {

      this.onSubmit(e);
    });
  }

  _listenerOfModal(e) {
    const button = e.target.closest("button");
    let amount = 0;

    if (button.classList.contains("cart-counter__button_minus")) {
      amount = -1;
    } else if (button.classList.contains("cart-counter__button_plus")) {
      amount = 1;
    }
    const closestCardProduct = button.closest(".cart-product");
    const productId = closestCardProduct.dataset.productId;
    this.updateProductCount(productId, amount);

    if (this.isEmpty()) {
      this._modal._elem.removeEventListener("click", (e) => this._listenerOfModal(e));
      this._modal.close();
    }
  }


  _getLayoutOfCart() {
    let layoutOfCart = document.createElement("div");
    this.cartItems.forEach((item) => {
      layoutOfCart.append(this.renderProduct(item.product, item.count));
    });

    layoutOfCart.append(this.renderOrderForm());

    return layoutOfCart;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains("is-modal-open")) {
      if (cartItem.count === 0) {
        let elemForDelite = this._modal._elem.querySelector(
          `[data-product-id="${cartItem.product.id}"]`
        );
        elemForDelite.remove();

      } else {

        let productCount = this._modal._elem.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-counter__count`
        );
        productCount.textContent = cartItem.count;

        let productPrice = this._modal._elem.querySelector(
          `[data-product-id="${cartItem.product.id}"] .cart-product__price`
        );
        productPrice.textContent = `€${(
          cartItem.product.price * cartItem.count
        ).toFixed(2)}`;

        let infoPrice = this._modal._elem.querySelector(
          `.cart-buttons__info-price`
        );
        infoPrice.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let formOfModal = this._modal._elem.querySelector(`.cart-form`);
    let bodyOfForm = new FormData(formOfModal);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: bodyOfForm,
    }).then(this._successSubmit());
  }

  _successSubmit() {
    const titleOfModal = this._modal._elem.querySelector(".modal__title");
    titleOfModal.textContent = "Success!";

    this.cartItems = [];

    const modalBodyDiv = this._modal._elem.querySelector(".modal .modal__body");
    modalBodyDiv.innerHTML = `
    <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`;
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
