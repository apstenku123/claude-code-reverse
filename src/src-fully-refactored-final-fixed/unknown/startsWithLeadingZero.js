/**
 * Checks if the input string starts with an optional minus sign and a leading zero digit (e.g., "0123", "-0123").
 *
 * @param {string} inputString - The string to check for a leading zero.
 * @returns {boolean} True if the string starts with an optional minus sign followed by a leading zero digit; otherwise, false.
 */
function startsWithLeadingZero(inputString) {
  // The regex /^-?0\d/ matches:
  //   ^      : start of string
  //   -?     : optional minus sign
  //   0      : zero digit
  //   \d    : any digit (0-9)
  return /^-?0\d/.test(inputString);
}

module.exports = startsWithLeadingZero;