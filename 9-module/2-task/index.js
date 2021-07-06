import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    const dataCarouselHolder = document.querySelector("[data-carousel-holder]");
    const carousel = new Carousel(slides);
    dataCarouselHolder.append(carousel.elem);

    const dataRibbonlHolder = document.querySelector("[data-ribbon-holder]");
    this.ribbonMenu = new RibbonMenu(categories);
    dataRibbonlHolder.append(this.ribbonMenu.elem);

    const dataSliderlHolder = document.querySelector("[data-slider-holder]");
    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3,
    });
    dataSliderlHolder.append(this.stepSlider.elem);

    const dataCartIconlHolder = document.querySelector(
      "[data-cart-icon-holder]"
    );
    const cartIcon = new CartIcon();
    dataCartIconlHolder.append(cartIcon.elem);

    const cart = new Cart(cartIcon);

    let response = await fetch("products.json");
    let products = await response.json();

    const dataProductsGridlHolder = document.querySelector(
      "[data-products-grid-holder]"
    );
    this.productsGrid = new ProductsGrid(products);
    dataProductsGridlHolder.append(this.productsGrid.elem);

    this.filter = {
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider._value,
      category: "",
    };

    this.productsGrid.updateFilter(this.filter);

    document.body.addEventListener("product-add", (e) => {
      const product = products.find((item) => item.id === e.detail);
      cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", (e) => {
      this.filter.maxSpiciness = e.detail;
      this.productsGrid.updateFilter(this.filter);
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (e) => {
      this.filter.category = e.detail;
      this.productsGrid.updateFilter(this.filter);
    });

    const nutsCheckbox = document.getElementById("nuts-checkbox");
    nutsCheckbox.addEventListener("change", (e) => {
      this.filter.noNuts = e.target.checked;
      this.productsGrid.updateFilter(this.filter);
    });

    const vegeterianCheckbox = document.getElementById("vegeterian-checkbox");
    vegeterianCheckbox.addEventListener("change", (e) => {
      this.filter.vegeterianOnly = e.target.checked;
      this.productsGrid.updateFilter(this.filter);
    });


  }
}
