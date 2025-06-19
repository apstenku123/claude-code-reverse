/**
 * Compares two objects whose keys are numeric (as strings), ensuring they have the same keys and that the 'content' property of each corresponding value is strictly equal.
 *
 * @param {Object} firstObject - The first object to compare. Keys are expected to be numeric strings, and values should have a 'content' property.
 * @param {Object} secondObject - The second object to compare. Keys are expected to be numeric strings, and values should have a 'content' property.
 * @returns {boolean} True if both objects are null/undefined, or if they have the same numeric keys and all corresponding 'content' properties are strictly equal. False otherwise.
 */
function areObjectContentsEqualByNumericKeys(firstObject, secondObject) {
  // If either object is falsy (null/undefined), return true only if both are falsy
  if (!firstObject || !secondObject) {
    return !firstObject && !secondObject;
  }

  // Get numeric keys from both objects
  const firstKeys = Object.keys(firstObject).map(Number);
  const secondKeys = Object.keys(secondObject).map(Number);

  // If the number of keys differ, objects are not equal
  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  // For each key in the first object, compare the 'content' property of both objects
  for (const key of firstKeys) {
    const firstValue = firstObject[key];
    const secondValue = secondObject[key];

    // If either value is missing or their 'content' properties differ, objects are not equal
    if (!firstValue || !secondValue || firstValue.content !== secondValue.content) {
      return false;
    }
  }

  // All keys and 'content' properties matched
  return true;
}

module.exports = areObjectContentsEqualByNumericKeys;