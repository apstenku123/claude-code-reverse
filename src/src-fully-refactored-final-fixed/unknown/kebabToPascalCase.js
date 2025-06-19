/**
 * Converts a kebab-case string to PascalCase.
 *
 * For example: 'my-example-string' => 'MyExampleString'
 *
 * @param {string} kebabString - The kebab-case string to convert.
 * @returns {string} The PascalCase version of the input string.
 */
function kebabToPascalCase(kebabString) {
  // Split the string by hyphens
  const words = kebabString.split("-");

  // Reduce the array of words into a PascalCase string
  const pascalCaseString = words.reduce((result, word) => {
    // Capitalize the first letter and add the rest of the word
    return result + word[0].toUpperCase() + word.slice(1);
  }, "");

  return pascalCaseString;
}

module.exports = kebabToPascalCase;