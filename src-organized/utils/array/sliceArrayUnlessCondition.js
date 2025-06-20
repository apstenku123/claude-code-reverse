/**
 * Returns a shallow copy of the input array. If the provided predicate function returns true for the array,
 * returns a shallow copy excluding the first element. Otherwise, returns a full shallow copy.
 *
 * @param {Array} inputArray - The array to be sliced.
 * @returns {Array} a shallow copy of the array, possibly without the first element depending on the predicate.
 */
function sliceArrayUnlessCondition(inputArray) {
  // If the predicate returns false, return a shallow copy of the entire array
  if (!D6(inputArray)) {
    return inputArray.slice();
  }
  // If the predicate returns true, return a shallow copy excluding the first element
  return inputArray.slice(1);
}

module.exports = sliceArrayUnlessCondition;