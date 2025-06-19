/**
 * Determines whether two objects are equivalent based on their type, value, and additional custom checks.
 *
 * @param {Object} firstObject - The first object to compare.
 * @param {Object} secondObject - The second object to compare.
 * @returns {boolean} True if the objects are equivalent; otherwise, false.
 */
function areObjectsEquivalent(firstObject, secondObject) {
  // Extract normalized representations of the objects
  const normalizedSecondObject = getFirstExceptionValue(secondObject);
  const normalizedFirstObject = getFirstExceptionValue(firstObject);

  // If either normalized object is falsy, objects are not equivalent
  if (!normalizedSecondObject || !normalizedFirstObject) {
    return false;
  }

  // Check if type or value properties differ
  if (
    normalizedSecondObject.type !== normalizedFirstObject.type ||
    normalizedSecondObject.value !== normalizedFirstObject.value
  ) {
    return false;
  }

  // Perform additional custom equivalence checks
  if (!areFingerprintsEqual(firstObject, secondObject)) {
    return false;
  }

  if (!areStackTracesEqual(firstObject, secondObject)) {
    return false;
  }

  // All checks passed; objects are considered equivalent
  return true;
}

module.exports = areObjectsEquivalent;