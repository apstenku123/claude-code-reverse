/**
 * Checks if the provided value is the special JavaScript NaN (Not-a-Number).
 *
 * In JavaScript, NaN is the only value that is not equal to itself. This function leverages that
 * property to determine if the input is NaN, while also ensuring the input is of type 'number'.
 *
 * @param {any} value - The value to check for NaN.
 * @returns {boolean} Returns true if the value is a number and is NaN, otherwise false.
 */
function isValueNaN(value) {
  // Check if the value is of type 'number' and is not equal to itself (only true for NaN)
  return typeof value === "number" && value !== value;
}

module.exports = isValueNaN;