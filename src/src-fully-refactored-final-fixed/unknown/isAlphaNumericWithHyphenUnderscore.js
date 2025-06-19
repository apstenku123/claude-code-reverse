/**
 * Checks if the input string contains only alphanumeric characters, hyphens, or underscores.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string contains only a-z, a-zA, 0-9, hyphens, or underscores; otherwise, false.
 */
function isAlphaNumericWithHyphenUnderscore(inputString) {
  // Regular expression matches strings containing only letters, numbers, hyphens, or underscores
  const validPattern = /^[a-zA-Z0-9-_]+$/;
  return validPattern.test(inputString);
}

module.exports = isAlphaNumericWithHyphenUnderscore;