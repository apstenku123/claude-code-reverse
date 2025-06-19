/**
 * Checks if the input string contains only alphanumeric characters, dashes, or underscores.
 *
 * @param {string} inputString - The string to validate.
 * @returns {boolean} True if the string contains only a-z, a-zA, 0-9, dash (-), or underscore (_); otherwise, false.
 */
function isAlphanumericWithDashesAndUnderscores(inputString) {
  // Regular expression matches strings containing only allowed characters
  return /^[a-zA-Z0-9-_]+$/.test(inputString);
}

module.exports = isAlphanumericWithDashesAndUnderscores;