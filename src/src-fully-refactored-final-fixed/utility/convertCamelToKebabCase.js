/**
 * Converts a camelCase string to kebab-case.
 *
 * This function searches for any lowercase letter immediately followed by an uppercase letter
 * and inserts a hyphen between them, then converts the entire string to lowercase.
 *
 * @param {string} inputString - The camelCase string to convert.
 * @returns {string} The converted kebab-case string.
 */
function convertCamelToKebabCase(inputString) {
  return inputString
    // Find any lowercase letter followed by an uppercase letter
    .replace(/[a-z][a-zA]/g, (matchedPair) => {
      // Insert a hyphen between the lowercase and uppercase letters
      return matchedPair.charAt(0) + '-' + matchedPair.charAt(1);
    })
    .toLowerCase(); // Convert the entire string to lowercase
}

module.exports = convertCamelToKebabCase;
