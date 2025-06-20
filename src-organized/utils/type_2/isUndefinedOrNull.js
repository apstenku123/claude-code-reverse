/**
 * Checks whether the provided value is either undefined or null.
 *
 * @param {*} value - The value to check for undefined or null.
 * @returns {boolean} Returns true if the value is undefined or null, otherwise false.
 */
function isUndefinedOrNull(value) {
  // Returns true if value is strictly undefined or null
  return value === undefined || value === null;
}

module.exports = isUndefinedOrNull;