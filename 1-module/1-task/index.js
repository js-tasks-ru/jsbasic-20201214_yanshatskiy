/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */

  function factorial(n) {
    if (n===0 || n===1) {
      return 1;
    }
    let result = n;
    while (n >1) {
      result *= (n-1);
      n--;
    }
    return result;
  }

