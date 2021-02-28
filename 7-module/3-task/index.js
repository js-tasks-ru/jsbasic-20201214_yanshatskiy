import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this._steps = steps;
    this._value = value;
    this.elem = this._getElemOfSlider();

    this._setAllElements();
    this._listener();
  }

  _setAllElements() {
    this._sliderValue = this.elem.querySelector(".slider__value");
    this._sliderStepsSpan = this.elem.querySelectorAll(".slider__steps span");
    this._sliderStepsSpan[0].classList.add("slider__step-active");
    this._thumb = this.elem.querySelector(".slider__thumb");
    this._progress = this.elem.querySelector(".slider__progress");

    this._applyNewValuesToSlider(this._value, this._steps-1);
  }

  _getElemOfSlider() {
    let layout = `
    <div class="slider">
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">
        ${this._getSteps()}
      </div>
    </div>`;

    return createElement(layout);
  }

  _getSteps() {
    let layout = ``;
    for (let i = 0; i < this._steps; i++) {
      layout += `<span></span>`;
    }
    return layout;
  }

  _listener() {
    this.elem.addEventListener("click", (e) => {
      const left = e.clientX - this.elem.getBoundingClientRect().left;
      const leftRelative = left / this.elem.offsetWidth;
      const segments = this._steps - 1;
      const approximateValue = leftRelative * segments;
      const value = Math.round(approximateValue);

      this._applyNewValuesToSlider(value, segments);
      this._makeCustomEvent(value);
    });
  }

  _applyNewValuesToSlider(value, segments) {
    const leftPercents = (value / segments) * 100;

    this._sliderValue.textContent = value;
    this._thumb.style.left = `${leftPercents}%`;
    this._progress.style.width = `${leftPercents}%`;

    this._makeSliderStepActive(value);
  }

  _makeCustomEvent(value) {
    const customEvent = new CustomEvent("slider-change", {
      detail: value,
      bubbles: true,
    });

    this.elem.dispatchEvent(customEvent);
  }

  _makeSliderStepActive(value) {
    this._sliderStepsSpan.forEach((span, index) => {
      span.classList.remove("slider__step-active");
      if (index === value) {
        span.classList.add("slider__step-active");
      }
    });
  }
}
