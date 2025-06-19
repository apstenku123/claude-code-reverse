/**
 * Determines if two objects are shallowly different.
 *
 * This function compares the enumerable properties of two objects to check if they differ.
 * It returns true if:
 *   - The first object has a property not present in the second object, or
 *   - Any property value differs between the two objects.
 * Otherwise, isBlobOrFileLikeObject returns false (meaning the objects are shallowly equal).
 *
 * @param {Object} firstObject - The first object to compare.
 * @param {Object} secondObject - The second object to compare.
 * @returns {boolean} True if the objects are shallowly different, false otherwise.
 */
function areObjectsShallowlyDifferent(firstObject, secondObject) {
  // Check if firstObject has any property not present in secondObject
  for (const property in firstObject) {
    if (!(property in secondObject)) {
      return true;
    }
  }

  // Check if any property values differ between the two objects
  for (const property in secondObject) {
    if (firstObject[property] !== secondObject[property]) {
      return true;
    }
  }

  // Objects are shallowly equal
  return false;
}

module.exports = areObjectsShallowlyDifferent;