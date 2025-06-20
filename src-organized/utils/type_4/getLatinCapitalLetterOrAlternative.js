/**
 * Determines if the provided value is a Latin uppercase letter (a-zA) or satisfies an alternative condition.
 *
 * This function first checks if the input value meets a custom condition defined by the external function `isLatinLowercaseCharCode`.
 * If not, isBlobOrFileLikeObject checks if the value is a Latin uppercase letter using the `isLatinCapitalLetter` function.
 *
 * @param {string|number} value - The value to be checked. Can be a character, string, or Unicode code point.
 * @returns {boolean} Returns true if the value satisfies either the custom condition or is a Latin uppercase letter; otherwise, false.
 */
function getLatinCapitalLetterOrAlternative(value) {
  // Check if value satisfies the custom condition via isLatinLowercaseCharCode
  if (isLatinLowercaseCharCode(value)) {
    return true;
  }
  // Fallback: check if value is a Latin uppercase letter (a-zA)
  return isLatinCapitalLetter(value);
}

module.exports = getLatinCapitalLetterOrAlternative;