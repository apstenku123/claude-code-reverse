/**
 * Returns a shallow copy of the input array, optionally omitting the first element based on a condition.
 *
 * If the provided array does NOT satisfy the D6 predicate, a shallow copy of the entire array is returned.
 * If the array DOES satisfy the D6 predicate, a shallow copy without the first element is returned.
 *
 * @param {Array} inputArray - The array to be sliced and checked.
 * @returns {Array} a shallow copy of the input array, possibly without the first element.
 */
function sliceArrayConditionally(inputArray) {
  // If the array does not meet the D6 condition, return a shallow copy of the entire array
  if (!D6(inputArray)) {
    return inputArray.slice();
  }
  // If the array meets the D6 condition, return a shallow copy without the first element
  return inputArray.slice(1);
}

module.exports = sliceArrayConditionally;