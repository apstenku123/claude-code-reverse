/**
 * Checks if the provided value is a valid JavaScript Date object.
 *
 * @param {any} value - The value to check for being a valid Date object.
 * @returns {boolean} Returns true if the value is a Date instance and represents a valid date; otherwise, false.
 */
function isValidDateObject(value) {
  // Check if value is an instance of Date and is not NaN (i.e., is a valid date)
  return value instanceof Date && !isNaN(value);
}

module.exports = isValidDateObject;