/**
 * Merges two arrays and returns a new array containing only unique elements.
 *
 * @param {Array<any>} firstArray - The first array to merge.
 * @param {Array<any>} secondArray - The second array to merge.
 * @returns {Array<any>} a new array containing unique elements from both input arrays.
 */
function mergeUniqueArrays(firstArray, secondArray) {
  // Combine both arrays into one
  const combinedArray = [...firstArray, ...secondArray];
  // Remove duplicate elements by converting to a Set, then back to an array
  const uniqueArray = Array.from(new Set(combinedArray));
  return uniqueArray;
}

module.exports = mergeUniqueArrays;