/**
 * Converts a camelCase or PascalCase string to snake_case, preserving the first character as-is.
 *
 * For example:
 *   'CamelCaseString' -> 'Camel_case_string'
 *   'myVariableName'  -> 'm_y_variable_name'
 *
 * @param {string} inputString - The string to convert to snake_case, preserving the first character.
 * @returns {string} The snake_case version of the input string, with the first character unchanged.
 */
function toSnakeCasePreserveFirstChar(inputString) {
  // Preserve the first character as-is
  const firstCharacter = inputString.substring(0, 1);
  // Convert the rest of the string: insert '_' before uppercase letters followed by lowercase or end of string, then lowercase the letter
  const restOfString = inputString.substring(1).replace(/([a-zA])(?=[a-z]|$)/g, function (match) {
    return "_" + match.toLowerCase();
  });
  return firstCharacter + restOfString;
}

module.exports = toSnakeCasePreserveFirstChar;
