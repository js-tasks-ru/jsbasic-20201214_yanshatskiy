/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const sortedList = str
    .split(",")
    .join(" ")
    .split(" ")
    .reduce((numbers, elem) => {
      if (elem !== "" && !Number.isNaN(+elem)) {
        numbers.push(+elem);
      }
      
      return numbers;
    }, [])
    .sort((a, b) => a - b);

  return { min: sortedList[0], max: sortedList[sortedList.length - 1] };
}
