/**
 * Checks if the provided array contains exactly one element and if that element passes the xO9 validation.
 * If so, returns the single element; otherwise, returns the original array.
 *
 * @param {Array<any>} possibleSingleElementArray - The array to check and potentially unwrap.
 * @returns {any} The single validated element if conditions are met, otherwise the original array.
 */
function unwrapSingleElementArrayIfValid(possibleSingleElementArray) {
  // Check if the array has exactly one element and that element passes the xO9 validation
  if (
    Array.isArray(possibleSingleElementArray) &&
    possibleSingleElementArray.length === 1 &&
    xO9(possibleSingleElementArray[0])
  ) {
    return possibleSingleElementArray[0];
  }
  // Return the original array if conditions are not met
  return possibleSingleElementArray;
}

module.exports = unwrapSingleElementArrayIfValid;