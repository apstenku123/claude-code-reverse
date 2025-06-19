/**
 * Compares two objects whose values are expected to be objects containing a 'content' property.
 * Returns true if both objects have the same set of numeric keys and for each key, the 'content' properties are strictly equal.
 *
 * @param {Object} firstContentMap - The first object to compare. Its values should be objects with a 'content' property.
 * @param {Object} secondContentMap - The second object to compare. Its values should be objects with a 'content' property.
 * @returns {boolean} True if both objects are structurally and content-wise equal, false otherwise.
 */
function areContentObjectsEqual(firstContentMap, secondContentMap) {
  // If either object is falsy, return true only if both are falsy
  if (!firstContentMap || !secondContentMap) {
    return !firstContentMap && !secondContentMap;
  }

  // Get all keys from both objects and convert them to numbers
  const firstKeys = Object.keys(firstContentMap).map(Number);
  const secondKeys = Object.keys(secondContentMap).map(Number);

  // If the number of keys is different, objects are not equal
  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  // For each key in the first object
  for (const key of firstKeys) {
    const firstValue = firstContentMap[key];
    const secondValue = secondContentMap[key];

    // If either value is missing or their 'content' properties differ, objects are not equal
    if (!firstValue || !secondValue || firstValue.content !== secondValue.content) {
      return false;
    }
  }

  // All keys and their 'content' properties matched
  return true;
}

module.exports = areContentObjectsEqual;