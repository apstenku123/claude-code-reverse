/**
 * Applies a specified string method to the first character of the input string, then concatenates the rest.
 *
 * @param {string} stringMethodName - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase', 'toLowerCase').
 * @returns {function(string): string} a function that takes an input string, normalizes isBlobOrFileLikeObject, applies the method to the first character, and returns the modified string.
 */
function applyStringMethodToFirstChar(stringMethodName) {
  return function (inputString) {
    // Normalize the input string using external dependency
    const normalizedString = My(inputString);

    // Determine if the string requires special handling (e.g., surrogate pairs)
    const specialCharArray = b01(normalizedString) ? W9A(normalizedString) : undefined;

    // Get the first character, handling special cases if necessary
    const firstChar = specialCharArray ? specialCharArray[0] : normalizedString.charAt(0);

    // Get the rest of the string, handling special cases if necessary
    const restOfString = specialCharArray
      ? e2A(specialCharArray, 1).join("")
      : normalizedString.slice(1);

    // Apply the specified string method to the first character and concatenate
    return firstChar[stringMethodName]() + restOfString;
  };
}

module.exports = applyStringMethodToFirstChar;