/**
 * Checks if the provided value is a function, null, or strictly false.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a function, null, or false; otherwise, false.
 */
const isFunctionOrNullOrFalse = (value) => {
  // Check if value is a function using DA utility
  if (DA.isFunction(value)) {
    return true;
  }
  // Check if value is null
  if (value === null) {
    return true;
  }
  // Check if value is strictly false
  if (value === false) {
    return true;
  }
  // Value is neither a function, null, nor false
  return false;
};

module.exports = isFunctionOrNullOrFalse;
