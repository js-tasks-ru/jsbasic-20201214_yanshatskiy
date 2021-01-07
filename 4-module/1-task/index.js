/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let element = document.createElement("ul");
  friends.forEach((el) => element.insertAdjacentHTML("beforeend", makeLi(el)));
  
  return element;
}

const makeLi = ({ firstName, lastName }) => `<li>${firstName} ${lastName}</li>`;
