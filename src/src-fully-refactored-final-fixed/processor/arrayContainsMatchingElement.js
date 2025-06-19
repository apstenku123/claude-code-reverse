/**
 * Checks if any element in the provided array matches a given condition.
 *
 * Iterates through the elements of the input array and applies the `initializeWasmAccessors` function
 * to each element along with the provided comparison value. If any call returns true, the function
 * immediately returns true. Otherwise, isBlobOrFileLikeObject returns false after checking all elements.
 *
 * @param {Array} arrayToCheck - The array whose elements will be checked.
 * @param {*} comparisonValue - The value to compare each array element against.
 * @returns {boolean} True if any element matches the condition; otherwise, false.
 */
function arrayContainsMatchingElement(arrayToCheck, comparisonValue) {
  const arrayLength = arrayToCheck.length;
  let currentIndex = 0;

  // Iterate through each element in the array
  while (currentIndex < arrayLength) {
    // If the condition is met for the current element, return true immediately
    if (initializeWasmAccessors(arrayToCheck[currentIndex], comparisonValue)) {
      return true;
    }
    currentIndex++;
  }
  // No matching element found
  return false;
}

module.exports = arrayContainsMatchingElement;