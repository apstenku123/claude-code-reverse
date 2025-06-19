/**
 * Converts a string with underscores followed by a character (e.g., '_a') to camelCase by removing the underscore and capitalizing the following letter.
 * For example, 'my_variable_name' becomes 'myVariableName'.
 *
 * @param {string} inputString - The string to convert from underscore format to camelCase.
 * @returns {string} The camelCase formatted string.
 */
function convertUnderscoreToCamelCase(inputString) {
  // Replace every occurrence of an underscore followed by a non-underscore character
  // with the uppercase version of that character (removing the underscore)
  return inputString.replace(/(_[^_])/g, (matchedSubstring) => {
    // Remove the underscore and capitalize the following character
    return matchedSubstring.slice(1).toUpperCase();
  });
}

module.exports = convertUnderscoreToCamelCase;