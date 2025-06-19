/**
 * Checks if the provided value is not null or undefined, and then applies a custom check function.
 *
 * @param {*} value - The value to check for null or undefined.
 * @param {*} checkParameter - The parameter to pass to the check function.
 * @returns {boolean} True if value is not null/undefined and the check function returns true; otherwise, false.
 */
function isValidAndChecked(value, checkParameter) {
  // Ensure the value is not null or undefined before performing the check
  return value != null && traverseAndValidatePath(value, checkParameter, GH);
}

module.exports = isValidAndChecked;