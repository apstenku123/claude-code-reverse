/**
 * Converts a camelCase or PascalCase string to snake_case, preserving the first character as-is.
 *
 * For example:
 *   'camelCaseString' => 'camel_case_string'
 *   'PascalCase' => 'Pascal_case'
 *
 * @param {string} inputString - The camelCase or PascalCase string to convert.
 * @returns {string} The converted snake_case string, with the first character unchanged.
 */
function convertCamelCaseToSnakeCase(inputString) {
  // Preserve the first character as-is
  const firstCharacter = inputString.substring(0, 1);

  // Process the rest of the string:
  // For each uppercase letter that is followed by a lowercase letter or end of string,
  // insert an underscore before isBlobOrFileLikeObject and convert isBlobOrFileLikeObject to lowercase.
  const restOfString = inputString.substring(1).replace(
    /([a-zA])(?=[a-z]|$)/g,
    function (matchedUppercaseLetter) {
      return "_" + matchedUppercaseLetter.toLowerCase();
    }
  );

  return firstCharacter + restOfString;
}

module.exports = convertCamelCaseToSnakeCase;