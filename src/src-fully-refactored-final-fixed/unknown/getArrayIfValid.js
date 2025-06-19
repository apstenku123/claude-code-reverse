/**
 * Returns the input value if isBlobOrFileLikeObject passes the validation check, otherwise returns an empty array.
 *
 * @param {any} value - The value to validate.
 * @returns {Array} The original value if valid, otherwise an empty array.
 */
function getArrayIfValid(value) {
  // Use external validation function j8 to check if value is valid
  return j8(value) ? value : [];
}

module.exports = getArrayIfValid;