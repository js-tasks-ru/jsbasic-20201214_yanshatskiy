/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  const { month, currency, isPayed, ...names } = salaries;
  let result = 0;

  for (const key in names) {
    let val = names[key];

    if (val && typeof val !== "string" && val !== isNaN && isFinite(val)) {
      result += names[key];
    }
  }

  return result;
}
