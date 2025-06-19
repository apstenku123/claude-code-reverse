/**
 * Checks if the input string starts with an optional minus sign followed by a zero and another digit.
 * This is typically used to detect numbers with leading zeros (e.g., "0123", "-0123").
 *
 * @param {string} inputString - The string to be tested for a leading zero (with optional minus sign).
 * @returns {boolean} Returns true if the string starts with an optional minus sign, then zero, then another digit; otherwise, false.
 */
function startsWithNegativeOrLeadingZero(inputString) {
  // The regex /^-?0\d/ matches:
  //   ^      : start of string
  //   -?     : optional minus sign
  //   0      : zero
  //   \d    : any digit (0-9)
  return /^-?0\d/.test(inputString);
}

module.exports = startsWithNegativeOrLeadingZero;