/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
  const tRows = [...table.querySelectorAll("tr")];
	tRows.forEach((row, index) => row.children[index].style.background = 'red');
}
