/**
 * Checks if the provided value is a valid JavaScript Date object.
 *
 * @param {any} value - The value to check for being a valid Date instance.
 * @returns {boolean} True if the value is a Date object and represents a valid date; otherwise, false.
 */
function isValidDate(value) {
  // Check if value is an instance of Date and not NaN (invalid date)
  return value instanceof Date && !isNaN(value);
}

module.exports = isValidDate;