/**
 * Converts a camelCase string to kebab-case.
 *
 * This function inserts a hyphen between lowercase and uppercase letter pairs,
 * then converts the entire string to lowercase.
 *
 * @param {string} inputString - The camelCase string to convert.
 * @returns {string} The converted kebab-case string.
 */
function camelCaseToKebabCase(inputString) {
  // Replace any lowercase-uppercase letter pair with lowercase-hyphen-uppercase
  // Example: 'camelCase' -> 'camel-Case'
  // Then convert the entire string to lowercase
  return inputString.replace(/([a-z])([a-zA])/g, '$1-$2').toLowerCase();
}

module.exports = camelCaseToKebabCase;
