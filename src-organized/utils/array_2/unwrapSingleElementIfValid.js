/**
 * Checks if the provided array contains exactly one element, and if that element passes the xO9 validation.
 * If so, returns the single element; otherwise, returns the original array.
 *
 * @param {Array<any>} sourceArray - The array to check and potentially unwrap.
 * @returns {any} The single validated element if conditions are met, otherwise the original array.
 */
function unwrapSingleElementIfValid(sourceArray) {
  // Check if the array has exactly one element and that element passes the xO9 validation
  if (sourceArray.length === 1 && xO9(sourceArray[0])) {
    return sourceArray[0];
  }
  // Otherwise, return the original array
  return sourceArray;
}

module.exports = unwrapSingleElementIfValid;