/**
 * Compares two arrays for strict equality.
 *
 * Returns true if both arrays have the same length and all corresponding elements are strictly equal (===).
 *
 * @param {Array} firstArray - The first array to compare.
 * @param {Array} secondArray - The second array to compare.
 * @returns {boolean} True if arrays are equal in length and content, false otherwise.
 */
function areArraysEqual(firstArray, secondArray) {
  // Check if arrays have the same length
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  // Compare each element for strict equality
  for (let index = 0; index < firstArray.length; index++) {
    if (firstArray[index] !== secondArray[index]) {
      return false;
    }
  }

  // All elements matched
  return true;
}

module.exports = areArraysEqual;