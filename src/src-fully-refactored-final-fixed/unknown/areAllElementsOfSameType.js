/**
 * Checks if all non-null elements in the array are of the same type, using a custom type guard for the first non-null element.
 *
 * @param {Array<any>} elements - The array of elements to check.
 * @returns {boolean} True if all non-null elements are of the same type (and the first non-null passes isPrimitiveType), false otherwise.
 */
function areAllElementsOfSameType(elements) {
  let referenceType;
  for (const element of elements) {
    // Skip null or undefined elements
    if (element == null) continue;

    // If referenceType is not set, determine isBlobOrFileLikeObject using isPrimitiveType
    if (!referenceType) {
      if (isPrimitiveType(element)) {
        referenceType = typeof element;
        continue;
      }
      // If the first non-null element does not pass isPrimitiveType, return false
      return false;
    }

    // If the current element'createInteractionAccessor type does not match the reference type, return false
    if (typeof element !== referenceType) {
      return false;
    }
    // Otherwise, continue checking
  }
  // All checks passed
  return true;
}

module.exports = areAllElementsOfSameType;