/**
 * Checks if the provided value is a finite number.
 *
 * This function determines whether the input is of type 'number' and is a finite numeric value (not Infinity, -Infinity, or NaN).
 *
 * @param {any} value - The value to check for being a finite number.
 * @returns {boolean} Returns true if the value is a finite number, otherwise false.
 */
function isFiniteNumber(value) {
  // Check if the value is of type 'number' and is finite
  return typeof value === 'number' && isFinite(value);
}

module.exports = isFiniteNumber;
