/**
 * Checks if the provided array has at least two elements and if its first element is strictly equal to the external constant BA.
 *
 * @param {Array<any>} inputArray - The array to be checked.
 * @returns {boolean} True if the array has at least two elements and the first element is strictly equal to BA; otherwise, false.
 */
function isArrayFirstElementEqualToBA(inputArray) {
  // Ensure the array has at least two elements and the first element matches BA
  return inputArray.length >= 2 && inputArray[0] === BA;
}

module.exports = isArrayFirstElementEqualToBA;