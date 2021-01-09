function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselSlidesNumber = carousel.querySelectorAll(".carousel__slide").length;
  const carouselInner = carousel.querySelector(".carousel__inner");
  const carouselInnerWidth = carouselInner.offsetWidth;
  let position = carouselInnerWidth;
  let slide = 1;

  hideElement(carouselArrowLeft);

  carousel.addEventListener("click", (event) => {
    const target = event.target.closest(".carousel__arrow");

    if (!target) return;

    if (target.classList.contains("carousel__arrow_right")) {
      carouselInner.style.transform = translateXdataRender(position);
      position += carouselInnerWidth;
      slide++;
    }

    if (target.classList.contains("carousel__arrow_left")) {
      position -= carouselInnerWidth;
      carouselInner.style.transform = translateXdataRender(position, carouselInnerWidth);
      slide--;
    }

    if (slide === carouselSlidesNumber) {
      hideElement(carouselArrowRight);
    } else {
      showElement(carouselArrowRight);
    }

    if (slide === 1) {
      hideElement(carouselArrowLeft);
    } else {
      showElement(carouselArrowLeft);
    }
  });

  function translateXdataRender(position, shift = 0) {
    return `translateX(-${position - shift}px)`
  }

  function hideElement(element) {
    element.style.display = "none";
  }

  function showElement(element) {
    element.style.display = "";
  }
}


