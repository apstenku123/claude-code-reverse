/**
 * Checks if two plain objects differ in keys or values.
 * Returns true if:
 *   - The first object has a key not present in the second, or
 *   - Any value for a matching key differs between the two objects.
 * Otherwise, returns false (objects have identical keys and values).
 *
 * @param {Object} firstObject - The reference object to compare from.
 * @param {Object} secondObject - The object to compare against.
 * @returns {boolean} True if objects differ in keys or values, false otherwise.
 */
function haveObjectsDiffered(firstObject, secondObject) {
  // Check if firstObject has any keys not present in secondObject
  for (const key in firstObject) {
    if (!(key in secondObject)) {
      return true;
    }
  }

  // Check if any values differ for keys present in both objects
  for (const key in secondObject) {
    if (firstObject[key] !== secondObject[key]) {
      return true;
    }
  }

  // Objects have identical keys and values
  return false;
}

module.exports = haveObjectsDiffered;