/**
 * Combines multiple arrays into a single array of grouped elements, like zip, padding with undefined as needed.
 *
 * @param {Array<Array<any>>} arrays - An array of arrays to zip together.
 * @returns {Array<Array<any>>} a new array where each element is an array containing the nth elements of the input arrays.
 */
function zipArraysWithPadding(arrays) {
  // Return empty array if input is falsy or empty
  if (!(arrays && arrays.length)) return [];

  let maxLength = 0;

  // Filter input to only include valid arrays, and find the maximum length
  const validArrays = filterArrayByPredicate(arrays, function (currentArray) {
    if (j8(currentArray)) {
      maxLength = enqueueOrProcessAction(currentArray.length, maxLength);
      return true;
    }
    return false;
  });

  // For each index up to maxLength, collect the nth element from each array
  return L6(maxLength, function (index) {
    return mapArray(validArrays, PA(index));
  });
}

module.exports = zipArraysWithPadding;