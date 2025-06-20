/**
 * Determines if the provided value is either a valid custom type (as defined by isNumberPairArray),
 * a number, or a Date instance.
 *
 * @param {any} value - The value to check for validity.
 * @returns {boolean} True if the value is considered valid (custom, number, or Date), otherwise false.
 */
function isPrimitiveOrDateOrCustomValid(value) {
  // Check if value passes the custom validation (isNumberPairArray),
  // or is a number, or is a Date instance
  return isNumberPairArray(value) || typeof value === "number" || value instanceof Date;
}

module.exports = isPrimitiveOrDateOrCustomValid;