/**
 * Checks if the provided value is a function.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a function, otherwise false.
 */
function isFunction(value) {
  // Use typeof to determine if the value is a function
  return typeof value === "function";
}

module.exports = isFunction;