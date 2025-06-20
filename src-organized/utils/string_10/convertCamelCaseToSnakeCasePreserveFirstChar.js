/**
 * Converts a camelCase string to snake_case, preserving the first character as-is.
 *
 * For example: 'myVariableName' -> 'my_variable_name'
 *
 * @param {string} inputString - The camelCase string to convert.
 * @returns {string} The converted snake_case string, with the first character unchanged.
 */
function convertCamelCaseToSnakeCasePreserveFirstChar(inputString) {
  // Preserve the first character as-is
  const firstCharacter = inputString.substring(0, 1);
  // Process the rest of the string: insert underscores before uppercase letters followed by lowercase or end of string, then lowercase them
  const restOfString = inputString.substring(1).replace(/([a-zA])(?=[a-z]|$)/g, function (matchedUppercaseLetter) {
    // Add underscore and convert the matched uppercase letter to lowercase
    return "_" + matchedUppercaseLetter.toLowerCase();
  });
  return firstCharacter + restOfString;
}

module.exports = convertCamelCaseToSnakeCasePreserveFirstChar;