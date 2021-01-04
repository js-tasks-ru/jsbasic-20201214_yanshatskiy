/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let element = document.createElement('ul');
  friends.forEach(el => element.insertAdjacentHTML('beforeend', `<li>${el.firstName} ${el.lastName}</li>`));
  
  return element;
}
