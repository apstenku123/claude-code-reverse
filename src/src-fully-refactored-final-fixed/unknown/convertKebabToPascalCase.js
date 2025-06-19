/**
 * Converts a kebab-case string to PascalCase.
 *
 * For example, 'my-variable-name' becomes 'MyVariableName'.
 *
 * @param {string} kebabString - The kebab-case string to convert.
 * @returns {string} The PascalCase version of the input string.
 */
function convertKebabToPascalCase(kebabString) {
  // Split the input string by hyphens to get all words
  const words = kebabString.split("-");

  // Reduce the array of words into a single PascalCase string
  const pascalCaseString = words.reduce((result, word) => {
    // Capitalize the first letter of each word and append the rest
    return result + word[0].toUpperCase() + word.slice(1);
  }, "");

  return pascalCaseString;
}

module.exports = convertKebabToPascalCase;