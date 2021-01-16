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
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement("div");
    this.elem.innerHTML = this.render(rows);
    this.buttons = this.elem.querySelectorAll("button");
    this.listeners(this.buttons);
  }
  render(rows) {
    let layout = `<table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`;

    rows.forEach((elem) => {
      layout += ` <tbody>
        <tr>
          <td>${elem.name}</td>
          <td>${elem.age}</td>
          <td>${elem.salary}</td>
          <td>${elem.city}</td>
          <td><button>X</button></td>
        </tr>
      </tbody>`;
    });
    return layout + `</table>`;
  }

  listeners([...buttons]) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        button.closest("tbody").remove();
      });
    });
  }
}
