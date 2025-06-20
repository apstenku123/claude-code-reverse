/**
 * Checks if a given value exists within the predefined set `resolveNodeValue`.
 *
 * @param {any} value - The value to check for presence in the set.
 * @returns {boolean} True if the value exists in the set, otherwise false.
 */
function isValuePresentInSet(value) {
  // Use the 'has' method to determine if the value is present in the set 'resolveNodeValue'
  return resolveNodeValue.has(value);
}

module.exports = isValuePresentInSet;