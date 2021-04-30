import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this._filteredCards = this.products;
    this.filters = {};
    this.elem = null;

    this._renderLayout();
  }

  _renderLayout() {
    let layout = `
    <div class="products-grid">
    <div class="products-grid__inner">

    </div>
    </div>
    `;

    this.elem = createElement(layout);
    this._productsGridInner = this.elem.querySelector(".products-grid__inner");

    this._renderCards();
  }

  _renderCards() {
    this._filteredCards.forEach((card) => {
      const el = new ProductCard(card).elem;
      this._productsGridInner.append(el);
    });

  }

  updateFilter(filter) {
    this.filters = Object.assign({}, this.filters, filter);
    this._filteredCards = this.products

      .filter((product) => {

        return this._isAllowCheck("noNuts", product);
      })
      .filter((product) => {

        return this._isAllowCheck("vegeterianOnly", product);
      })
      .filter((product) => {

        return this. _spicinessSelect(product);
      })

      .filter((product) => {

        return this._categorySelect(product);
      });

    this._productsGridInner.innerHTML = "";
    this._renderCards();
  }

  _categorySelect(product) {
    if (this.filters["category"]) {

      if (
        this.filters["category"] === product["category"] ||
        this.filters["category"] === ""
      ) {
        return true;
      }
      return false;
    }
    return true;
  }

  _spicinessSelect(product) {
    if (this.filters["maxSpiciness"]) {

      if (product["spiciness"] <= this.filters["maxSpiciness"]) {
        return true;
      }
      return false;
    }
    return true;
  }

  _isAllowCheck(filterItem, product) {

    if (this.filters[filterItem]) {
      if (
        (this.filters[filterItem] && product[filterItem]) ||
        (this.filters[filterItem] && product[filterItem] === undefined) ||
        this.filters[filterItem] === false
      ) {
        return true;
      }
      return false;
    }
    return true;
  }
}