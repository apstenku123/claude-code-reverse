/**
 * Checks if the provided value is an array and that none of its elements satisfy the predicate function `m$1`.
 *
 * @param {any} possibleArray - The value to check if isBlobOrFileLikeObject'createInteractionAccessor an array and to test its elements.
 * @returns {boolean} Returns true if `possibleArray` is an array and none of its elements satisfy `m$1`; otherwise, false.
 */
function isArrayWithoutMatchingElements(possibleArray) {
  // Check if the input is an array using DA.isArray
  const isArray = DA.isArray(possibleArray);
  // If isBlobOrFileLikeObject'createInteractionAccessor not an array, return false immediately
  if (!isArray) {
    return false;
  }
  // Use Array.prototype.some to check if any element matches the predicate m$1
  // Negate the result to ensure that NONE of the elements match
  const hasNoMatchingElements = !possibleArray.some(m$1);
  return hasNoMatchingElements;
}

module.exports = isArrayWithoutMatchingElements;