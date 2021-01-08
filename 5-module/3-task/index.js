function initCarousel() {
  const carousel = document.querySelector(".carousel");
  const carouselArrowRight = document.querySelector(".carousel__arrow_right");
  const carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  const carouselSlidesNumber = carousel.querySelectorAll(".carousel__slide").length;
  const carouselInner = carousel.querySelector(".carousel__inner");
  const carouselInnerWidth = carouselInner.offsetWidth;
  let position = carouselInnerWidth;
  let slide = 1;

  carouselArrowLeft.style.display = "none";

  carousel.addEventListener("click", (event) => {
    const target = event.target.closest(".carousel__arrow");

    if (!target) return;

    if (target.classList.contains("carousel__arrow_right")) {
      carouselInner.style.transform = `translateX(-${position}px)`;
      position += carouselInnerWidth;
      slide++;
    }

    if (target.classList.contains("carousel__arrow_left")) {
      position -= carouselInnerWidth;
      carouselInner.style.transform = `translateX(-${position - carouselInnerWidth}px)`;
      slide--;
    }

    if (slide === carouselSlidesNumber) {
      carouselArrowRight.style.display = "none";
    } else {
      carouselArrowRight.style.display = "";
    }

    if (slide === 1) {
      carouselArrowLeft.style.display = "none";
    } else {
      carouselArrowLeft.style.display = "";
    }
  });
}

