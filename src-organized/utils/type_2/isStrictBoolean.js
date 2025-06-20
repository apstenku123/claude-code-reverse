/**
 * Checks if the provided value is strictly the boolean value true or false.
 *
 * @param {any} value - The value to check for strict boolean equality.
 * @returns {boolean} Returns true if the value is exactly true or exactly false; otherwise, false.
 */
const isStrictBoolean = (value) => {
  // Check if value is strictly true or strictly false
  return value === true || value === false;
};

module.exports = isStrictBoolean;
