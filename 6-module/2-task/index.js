import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor({ name, price, category, image, id }) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.image = image;
    this.id = id;
    this.elem = createElement(this.render());
    this.cardButton = this.elem.querySelector(".card__button");
    this._clickOnButton = this._clickOnButton.bind(this);
    this.listener();
  }

  render() {
    return `
    <div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${
          this.image
        }" class="card__image" alt="product">
        <span class="card__price">€${this.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>
    `;
  }

  listener() {
    this.cardButton.addEventListener("click", this._clickOnButton);
    this.elem.addEventListener("product-add", (event) => {
      console.log(event);
    });
  }
  _clickOnButton() {
    const event = new CustomEvent("product-add", {
      detail: this.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(event);
  }
}
