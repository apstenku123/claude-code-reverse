/**
 * Returns a shallow copy of the input array, optionally excluding the first element based on a condition.
 *
 * If the provided array passes the isSpecialArray check (D6), the returned array excludes the first element.
 * Otherwise, a full shallow copy of the array is returned.
 *
 * @param {Array} inputArray - The array to process.
 * @returns {Array} a shallow copy of the array, possibly without the first element.
 */
function getArrayWithoutFirstElementIfConditionMet(inputArray) {
  // Check if the input array meets the special condition
  if (!D6(inputArray)) {
    // If not, return a shallow copy of the entire array
    return inputArray.slice();
  }
  // If condition is met, return a shallow copy without the first element
  return inputArray.slice(1);
}

module.exports = getArrayWithoutFirstElementIfConditionMet;