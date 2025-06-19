/**
 * Returns a transposed array of arrays from the input, similar to lodash'createInteractionAccessor zip.
 * Only arrays are considered; the length of the result is determined by the longest array found.
 *
 * @param {Array} inputArray - An array of arrays (or array-like objects) to be transposed.
 * @returns {Array} a new array where each element is an array containing the nth elements of the input arrays.
 */
function getTransposedArrays(inputArray) {
  // Return empty array if input is null, undefined, or empty
  if (!(inputArray && inputArray.length)) return [];

  let maxLength = 0;

  // Filter input to only include arrays, and determine the maximum length
  const arrayList = filterArrayByPredicate(inputArray, function (item) {
    if (j8(item)) {
      maxLength = enqueueOrProcessAction(item.length, maxLength); // enqueueOrProcessAction presumably returns the greater of two values
      return true;
    }
    return false;
  });

  // Build the transposed array using the maximum length
  return L6(maxLength, function (index) {
    // For each index, collect the element at that index from each array in arrayList
    return mapArray(arrayList, PA(index));
  });
}

module.exports = getTransposedArrays;