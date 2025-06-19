/**
 * Determines if the provided value is an array.
 *
 * Uses Array.isArray if available; otherwise, falls back to checking the internal [[Class]]
 * of the value using getObjectTypeString.
 *
 * @param {*} value - The value to check for array-ness.
 * @returns {boolean} True if the value is an array, false otherwise.
 */
function isArrayUtility(value) {
  // If Array.isArray is not available, use getObjectTypeString fallback
  if (typeof Array.isArray !== 'function') {
    // getObjectTypeString returns strings like '[object Array]', '[object Null]', etc.
    return getObjectTypeString(value) === '[object Array]';
  }
  // Use the native Array.isArray if available
  return Array.isArray(value);
}

module.exports = isArrayUtility;