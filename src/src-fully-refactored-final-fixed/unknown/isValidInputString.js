/**
 * Checks if the input string matches the allowed pattern and does not match the forbidden pattern.
 *
 * @param {string} inputString - The string to validate against the allowed and forbidden patterns.
 * @returns {boolean} True if the string matches the allowed pattern and does not match the forbidden pattern; otherwise, false.
 */
function isValidInputString(inputString) {
  // Check if inputString matches the allowed pattern (wr4) and does NOT match the forbidden pattern (Er4)
  return wr4.test(inputString) && !Er4.test(inputString);
}

module.exports = isValidInputString;