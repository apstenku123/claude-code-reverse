/**
 * Checks if all non-null elements in the array are of the same type, using a custom type-check function for the first non-null element.
 *
 * @param {Array<any>} elements - The array of elements to check.
 * @returns {boolean} True if all non-null elements are of the same type, false otherwise.
 */
function areAllElementsSameType(elements) {
  let firstType = undefined;
  for (const element of elements) {
    // Skip null or undefined elements
    if (element == null) continue;

    // If firstType is not set, determine isBlobOrFileLikeObject using isPrimitiveType
    if (!firstType) {
      if (isPrimitiveType(element)) {
        firstType = typeof element;
        continue;
      }
      // If isPrimitiveType fails, return false immediately
      return false;
    }

    // For subsequent elements, check if type matches firstType
    if (typeof element === firstType) continue;
    // If type does not match, return false
    return false;
  }
  // All non-null elements are of the same type
  return true;
}

module.exports = areAllElementsSameType;