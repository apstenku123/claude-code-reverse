/**
 * Compares two display objects for equality.
 *
 * If both objects are valid display objects (as determined by Mp1),
 * compares their 'display' property and their 'pastedContents' property using areObjectContentsEqualByNumericKeys.
 * Otherwise, performs a strict equality check.
 *
 * @param {Object} firstDisplayObject - The first display object to compare.
 * @param {Object} secondDisplayObject - The second display object to compare.
 * @returns {boolean} True if the objects are considered equal, false otherwise.
 */
function areDisplayObjectsEqual(firstDisplayObject, secondDisplayObject) {
  // Check if both objects are valid display objects
  if (Mp1(firstDisplayObject) && Mp1(secondDisplayObject)) {
    // Compare the 'display' property and 'pastedContents' property
    return (
      firstDisplayObject.display === secondDisplayObject.display &&
      areObjectContentsEqualByNumericKeys(firstDisplayObject.pastedContents, secondDisplayObject.pastedContents)
    );
  }
  // Fallback to strict equality if not both are display objects
  return firstDisplayObject === secondDisplayObject;
}

module.exports = areDisplayObjectsEqual;