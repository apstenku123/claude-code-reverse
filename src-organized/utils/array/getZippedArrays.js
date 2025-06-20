/**
 * Returns a new array where each element is an array containing the nth elements from each input array.
 * Only arrays among the inputs are considered; non-arrays are ignored.
 * The length of the resulting array is equal to the length of the longest input array.
 *
 * @param {Array} inputArray - An array of arrays (or values), to be zipped together by index.
 * @returns {Array} An array of arrays, each containing the nth elements from the input arrays.
 */
function getZippedArrays(inputArray) {
  // Return empty array if input is null, undefined, or empty
  if (!(inputArray && inputArray.length)) return [];

  let maxLength = 0;

  // Filter inputArray to only include arrays, and determine the maximum length
  const arrayInputs = filterArrayByPredicate(inputArray, function (item) {
    if (j8(item)) {
      // Update maxLength to be the maximum length found so far
      maxLength = enqueueOrProcessAction(item.length, maxLength);
      return true;
    }
    return false;
  });

  // For each index up to maxLength, collect the nth element from each array in arrayInputs
  return L6(maxLength, function (index) {
    return mapArray(arrayInputs, PA(index));
  });
}

module.exports = getZippedArrays;