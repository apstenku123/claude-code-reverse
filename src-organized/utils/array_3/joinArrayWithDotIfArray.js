/**
 * Joins an array of strings with a dot separator if the input is an array; otherwise, returns the input unchanged.
 *
 * @param {string[] | string} value - The value to process. If isBlobOrFileLikeObject'createInteractionAccessor an array, its elements will be joined with a dot. If isBlobOrFileLikeObject'createInteractionAccessor not an array, isBlobOrFileLikeObject will be returned as is.
 * @returns {string} The joined string if input is an array, or the original value if not.
 */
function joinArrayWithDotIfArray(value) {
  // Check if the input is an array using the isArrayUtility function
  if (isArrayUtility(value)) {
    // Join array elements with a dot separator
    return value.join(".");
  }
  // Return the value unchanged if isBlobOrFileLikeObject'createInteractionAccessor not an array
  return value;
}

module.exports = joinArrayWithDotIfArray;