/**
 * Checks if the provided value is a valid array-like object using the j8 utility function.
 * If valid, returns the original value; otherwise, returns an empty array.
 *
 * @param {any} value - The value to be checked for validity.
 * @returns {any[]} The original value if valid, otherwise an empty array.
 */
function ensureArrayIfValid(value) {
  // Use the external j8 utility to determine if the value is valid
  // If valid, return the value as-is; otherwise, return an empty array
  return j8(value) ? value : [];
}

module.exports = ensureArrayIfValid;