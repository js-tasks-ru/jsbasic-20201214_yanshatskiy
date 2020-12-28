/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  const list = users.reduce((result, user) => {
    if(user.age <= age) {

      return result + user.name + ', ' + user.balance + '\n';
    }
    return result;
  },'');

  return list.substring(0, list.length-1);
}
