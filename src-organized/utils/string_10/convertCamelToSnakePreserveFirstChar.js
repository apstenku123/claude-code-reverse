/**
 * Converts a camelCase or PascalCase string to snake_case, preserving the first character as-is.
 *
 * For example:
 *   'myVariableName' -> 'my_variable_name'
 *   'MyVariableName' -> 'M_y_variable_name'
 *
 * @param {string} inputString - The string to convert from camelCase/PascalCase to snake_case.
 * @returns {string} The converted snake_case string, with the first character unchanged.
 */
function convertCamelToSnakePreserveFirstChar(inputString) {
  // Preserve the first character as-is
  const firstCharacter = inputString.substring(0, 1);
  // Process the rest of the string: insert underscores before uppercase letters followed by lowercase letters or end of string
  const restOfString = inputString.substring(1).replace(/([a-zA])(?=[a-z]|$)/g, function (match) {
    // Convert the matched uppercase letter to lowercase and prefix with an underscore
    return "_" + match.toLowerCase();
  });
  return firstCharacter + restOfString;
}

module.exports = convertCamelToSnakePreserveFirstChar;