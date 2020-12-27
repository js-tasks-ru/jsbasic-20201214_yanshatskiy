/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  const sentense = str
    .split("-")
    .map((word) => (word === "" ? " " : word[0].toUpperCase() + word.slice(1)))
    .join("");

  return (sentense[0].toLowerCase() + sentense.slice(1)).trim();
}
