/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
	[...table.querySelectorAll("tr")].map((row, index) => {
		if (index > 0) {
		  const isAvailable = row.lastElementChild.dataset.available;

		  if (!isAvailable) {
			row.setAttribute("hidden", "");
		  }

		  isAvailable === "true"
			? row.classList.add("available")
			: row.classList.add("unavailable");

		  row.children[2].textContent === "m"
			? row.classList.add("male")
			: row.classList.add("female");

		  Number(row.children[1].textContent) < 18
			? (row.style.textDecoration = "line-through")
			: true;
		}
	  });
}
