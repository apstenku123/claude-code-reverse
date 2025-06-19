/**
 * Checks if the input string matches the valid pattern and does NOT match the invalid pattern.
 *
 * @param {string} inputString - The string to be tested against the patterns.
 * @returns {boolean} True if inputString matches the valid pattern and does not match the invalid pattern; otherwise, false.
 */
function isValidButNotInvalidPattern(inputString) {
  // Returns true only if inputString matches the valid pattern (Kv4)
  // and does NOT match the invalid pattern (Hv4)
  return Kv4.test(inputString) && !Hv4.test(inputString);
}

module.exports = isValidButNotInvalidPattern;