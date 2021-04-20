import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this._filteredCards = this.products;
    this.filters = {};
    this.elem = null;

    this._renderLayout();
    this._container = document.querySelector("#container");

  }

  _renderLayout() {
    let layout = `
    <div class="products-grid">
    <div class="products-grid__inner">

      ${this._renderCards()}
    </div>
  </div>
    `;
    this.elem = createElement(layout);
  }

  _renderCards() {
    const cardsLayout = this._filteredCards
      .map((card) => {
        return new ProductCard(card)._getLayout();
      })
      .join("");

    return cardsLayout;
  }

  updateFilter(filter) {

    this.filters = Object.assign({}, this.filters, filter);


    this._filteredCards = this.products.filter((product) => {

      let result =  this._categorySelect(product) +
                    this._spicinessSelect(product) +
                    this._isAllowCheck("noNuts", product) +
                    this._isAllowCheck("vegeterianOnly", product);

      return result === Object.keys(this.filters).length;
    });


    this._renderLayout();
    this._container = document.querySelector("#container");
    this._container.innerHTML = "";

    this._container.append(this.elem);
  }

  _categorySelect(product) {
    if (
      this.filters["category"] === product["category"] ||
      this.filters["category"] === ""
    ) {
      return 1;
    }
    return 0;
  }

  _spicinessSelect (product) {
    if (product["spiciness"] <= this.filters["maxSpiciness"]) {
      return 1;
    }
    return 0;
  }

  _isAllowCheck(filterItem, product) {
    if (
      (this.filters[filterItem] && product[filterItem]) ||
      (this.filters[filterItem] && product[filterItem] === undefined) ||
      this.filters[filterItem] === false
    ) {
      return 1;
    }
    return 0;
  }
}
