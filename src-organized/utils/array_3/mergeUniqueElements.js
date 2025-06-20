/**
 * Merges two arrays and returns a new array containing only unique elements from both.
 *
 * @param {Array<any>} firstArray - The first array to merge.
 * @param {Array<any>} secondArray - The second array to merge.
 * @returns {Array<any>} a new array containing unique elements from both input arrays.
 */
function mergeUniqueElements(firstArray, secondArray) {
  // Combine both arrays into one
  const combinedArray = [...firstArray, ...secondArray];
  // Remove duplicate elements by converting to a Set, then back to an array
  return Array.from(new Set(combinedArray));
}

module.exports = mergeUniqueElements;