/**
 * Checks if the provided value is strictly null.
 *
 * @param {*} value - The value to check for null.
 * @returns {boolean} True if the value is null, otherwise false.
 */
const isNull = (value) => {
  // Strict equality check to ensure value is exactly null
  return value === null;
};

module.exports = isNull;