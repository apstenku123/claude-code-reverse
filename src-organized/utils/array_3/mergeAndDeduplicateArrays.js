/**
 * Merges two arrays and removes duplicate entries.
 *
 * @param {Array<any>} firstArray - The first array to merge.
 * @param {Array<any>} secondArray - The second array to merge.
 * @returns {Array<any>} a new array containing unique elements from both input arrays.
 */
function mergeAndDeduplicateArrays(firstArray, secondArray) {
  // Combine both arrays into one
  const combinedArray = [...firstArray, ...secondArray];
  // Remove duplicates by converting to a Set, then back to an array
  const uniqueArray = Array.from(new Set(combinedArray));
  return uniqueArray;
}

module.exports = mergeAndDeduplicateArrays;