/**
 * Checks if the provided value is a string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is a string, otherwise false.
 */
const isString = (value) => {
  // Use typeof to determine if the value is a string
  return typeof value === "string";
};

module.exports = isString;
