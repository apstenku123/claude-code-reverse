/**
 * Checks if all non-null elements in the provided array are of the same type, using a custom type-checking function for the first non-null element.
 *
 * @param {Array<any>} elements - The array of elements to check for type consistency.
 * @returns {boolean} True if all non-null elements are of the same type (as determined by isPrimitiveType for the first non-null element), false otherwise.
 */
function areAllNonNullElementsSameType(elements) {
  let firstNonNullType;
  for (const element of elements) {
    // Skip null or undefined elements
    if (element == null) continue;

    // If this is the first non-null element, determine its type using isPrimitiveType
    if (!firstNonNullType) {
      if (isPrimitiveType(element)) {
        firstNonNullType = typeof element;
        continue;
      }
      // If isPrimitiveType returns false for the first non-null element, return false
      return false;
    }

    // For subsequent non-null elements, check if their type matches the first
    if (typeof element === firstNonNullType) continue;
    // If a type mismatch is found, return false
    return false;
  }
  // All non-null elements are of the same type (or array is empty/all null)
  return true;
}

module.exports = areAllNonNullElementsSameType;