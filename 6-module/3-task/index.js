import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = document.createElement("div");
    this.elem.classList.add("carousel");
    this.elem = createElement(this.renderSlides());
    this.carouselArrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.carouselSlidesNumber = this.elem.querySelectorAll(".carousel__slide").length;
    this.carouselInner = this.elem.querySelector(".carousel__inner");
    this.cardButtons = this.elem.querySelectorAll(".carousel__button");
    this.carouselInnerWidth;
    this.position;
    this.slide = 1;
    this.hideElement(this.carouselArrowLeft);
    this.listener();
  }

  listener() {
    this.elem.addEventListener("click", (event) => this.moveSlides(event));

    [... this.cardButtons].forEach(button => {
       button.addEventListener("click", (event)=> {
      this._clickOnButton(event);
      });
    })

    this.elem.addEventListener("product-add", () => {
    });
  }
  _clickOnButton(event) {
    const customEvent = new CustomEvent("product-add", {
      detail: event.target.closest('button').dataset.id,
      bubbles: true,
    });
    this.elem.dispatchEvent(customEvent);
  }

  moveSlides(event) {
    if (!this.position && this.position != 0) {
      this.carouselInnerWidth = this.carouselInner.offsetWidth;
      this.position = this.carouselInnerWidth;
    }

    const target = event.target.closest(".carousel__arrow");

    if (!target) return;

    if (target.classList.contains("carousel__arrow_right")) {
      this.carouselInner.style.transform = this.translateXdataRender(
        this.position
      );
      this.position += this.carouselInnerWidth;
      this.slide++;
    }

    if (target.classList.contains("carousel__arrow_left")) {
      this.position -= this.carouselInnerWidth;
      this.carouselInner.style.transform = this.translateXdataRender(
        this.position,
        this.carouselInnerWidth
      );
      this.slide--;
    }

    if (this.slide === this.carouselSlidesNumber) {
      this.hideElement(this.carouselArrowRight);
    } else {
      this.showElement(this.carouselArrowRight);
    }

    if (this.slide === 1) {
      this.hideElement(this.carouselArrowLeft);
    } else {
      this.showElement(this.carouselArrowLeft);
    }
  }

  translateXdataRender(position, shift = 0) {
    return `translateX(-${position - shift}px)`;
  }

  hideElement(element) {
    element.style.display = "none";
  }

  showElement(element) {
    element.style.display = "";
  }

  renderSlides() {
    let resultHtml = `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">`;

    this.slides.forEach((slide) => {
      resultHtml += `
      <div class="carousel__slide" data-id="penang-shrimp">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button" data-id=${slide.id}>
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`;
    });

    resultHtml += `
      </div>
    </div>`;

    return resultHtml;
  }
}
