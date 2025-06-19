/**
 * Checks if the provided array has at least two elements and if the first element is strictly equal to the constant BA.
 *
 * @param {Array<any>} inputArray - The array to check.
 * @returns {boolean} True if the array has at least two elements and the first element is BA; otherwise, false.
 */
function isArrayWithFirstElementBA(inputArray) {
  // Ensure the array has at least two elements and the first element matches BA
  return inputArray.length >= 2 && inputArray[0] === BA;
}

module.exports = isArrayWithFirstElementBA;