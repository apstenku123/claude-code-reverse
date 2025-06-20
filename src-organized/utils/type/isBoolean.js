/**
 * Checks if the provided value is of boolean type.
 *
 * @param {*} value - The value to check for boolean type.
 * @returns {boolean} Returns true if the value is a boolean, otherwise false.
 */
const isBoolean = (value) => {
  // Use typeof operator to check if the value is a boolean
  return typeof value === "boolean";
};

module.exports = isBoolean;