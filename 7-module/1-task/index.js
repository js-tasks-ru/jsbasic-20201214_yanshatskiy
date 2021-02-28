import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._ribbonInner = null;
    this.elem = this._getLayoutRibbonMenu();
    this._ribbonArrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this._ribbonArrowRight = this.elem.querySelector('.ribbon__arrow_right');
    this._initListeners();
  }

  _getLayoutRibbonMenu() {
    let layout = `
    <!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>

      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
        ${this._getCategoryLinks()}
      </nav>

      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

    return this._addActiveClassToLinks (layout);
  }

  _getCategoryLinks(){
    const layout = this.categories.reduce((result, category) => {
      result += `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
      return result;
    }, '');

    return layout;
  }

  _addActiveClassToLinks (layout) {
    const elem = createElement(layout);
    this._makeElements(elem);
    this._ribbonInner.firstElementChild.classList.add('ribbon__item_active');
    this._ribbonInner.lastElementChild.classList.add('ribbon__item_active');
    return elem;
  }

  _makeElements(elem) {
    this._ribbonInner = elem.querySelector('.ribbon__inner');
    this._ribbonMenuItems = this._ribbonInner.querySelectorAll('.ribbon__item');
  }

  _initListeners() {
    this._ribbonArrowLeft.addEventListener('click', () => {
      this._onMoveRibbonToRight ();
    });

    this._ribbonArrowRight.addEventListener('click', () => {
      this._onMoveRibbonToLeft ();
    });

    this._ribbonInner.addEventListener('click', this._onClickRibbonInner);
  }

  _onClickRibbonInner = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;

    this._ribbonMenuItems.forEach( item => {
      item.classList.remove('ribbon__item_active');

      if (item.dataset.id === id) {
        item.classList.add('ribbon__item_active');
      }
    });

    const customEvent = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    });

    this._ribbonInner.dispatchEvent(customEvent);
  }

  _onMoveRibbonToLeft () {
    this._ribbonInner.scrollBy(350, 0);
    const scrollWidth = this._ribbonInner.scrollWidth;
    const scrollLeft = this._ribbonInner.scrollLeft;
    const clientWidth = this._ribbonInner.clientWidth;
    this._scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (this._scrollRight < 350) {
      this._ribbonInner.addEventListener('scroll', ()=> {
        this._ribbonArrowRight.classList.remove('ribbon__arrow_visible');
      } , { once: true });

      return;
    }
    this._showAllArrow();
  }

  _onMoveRibbonToRight () {
    this._ribbonInner.scrollBy(-350, 0);
    this._scrollLeft = this._ribbonInner.scrollLeft;
    if (this._scrollLeft < 350) {
      this._ribbonInner.addEventListener('scroll', ()=> {
        this._ribbonArrowLeft.classList.remove('ribbon__arrow_visible');
      } , { once: true });

      return;
    }
    this._showAllArrows();
  }

  _showAllArrows() {
    this._ribbonArrowLeft.classList.add('ribbon__arrow_visible');
    this._ribbonArrowRight.classList.add('ribbon__arrow_visible');
  }
}
