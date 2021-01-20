/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: '',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
import createElement from "../../assets/lib/create-element.js";

export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this.elem = null;
    this._render();
    this._buttons = this.elem.querySelectorAll("button");
    this._listeners(this._buttons);
  }
  _render() {
    const layout = this._getLayout();
    this.elem = createElement(layout);
  }

  _listeners([...buttons]) {
    buttons.forEach((button) => {
      const removeClosestElement = ()=> button.closest("tbody").remove();
      button.addEventListener("click", () => {
        removeClosestElement();
        button.removeEventListener("click", () => {
          removeClosestElement();
        });
      });
    });
  }

  _getLayout() {

    return `<table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
      ${this._getRowsTemplate()}
   </table>`;
  }

  _getRowsTemplate() {

    let rowsTemplate = '';
    this._rows.forEach((elem) => {
      rowsTemplate += ` <tbody>
        <tr>
          <td>${elem.name}</td>
          <td>${elem.age}</td>
          <td>${elem.salary}</td>
          <td>${elem.city}</td>
          <td><button>X</button></td>
        </tr>
      </tbody>`;
    });

    return rowsTemplate;
  }
}
