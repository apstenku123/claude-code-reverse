/**
 * Checks if the provided value is an array.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if the value is an array, otherwise false.
 */
const isArrayValue = (value) => {
  // Use Array.isArray to determine if the value is an array
  return Array.isArray(value);
};

module.exports = isArrayValue;