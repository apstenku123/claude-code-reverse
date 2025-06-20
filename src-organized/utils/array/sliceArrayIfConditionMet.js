/**
 * Returns a shallow copy of the input array, optionally excluding the first element based on a condition.
 *
 * If the provided array does NOT meet the condition defined by the external D6 function, 
 * a full shallow copy of the array is returned. If the array DOES meet the condition, 
 * a shallow copy excluding the first element is returned.
 *
 * @param {Array} inputArray - The array to be copied and potentially sliced.
 * @returns {Array} a shallow copy of the array, possibly without the first element.
 */
function sliceArrayIfConditionMet(inputArray) {
  // If the condition is NOT met, return a shallow copy of the entire array
  if (!D6(inputArray)) {
    return inputArray.slice();
  }
  // If the condition IS met, return a shallow copy excluding the first element
  return inputArray.slice(1);
}

module.exports = sliceArrayIfConditionMet;