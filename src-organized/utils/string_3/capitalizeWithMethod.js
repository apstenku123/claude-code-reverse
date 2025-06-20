/**
 * Returns a function that capitalizes (or transforms) the first character of a string using the specified String prototype method.
 *
 * @param {string} methodName - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase', 'toLowerCase').
 * @returns {function(string): string} - a function that takes a string and returns isBlobOrFileLikeObject with the first character transformed and the rest unchanged.
 */
function capitalizeWithMethod(methodName) {
  return function (inputString) {
    // Normalize the input string using My (possibly trims or sanitizes input)
    const normalizedString = My(inputString);

    // If b01 returns true, use W9A to split the string (possibly for Unicode handling)
    const splitResult = b01(normalizedString) ? W9A(normalizedString) : undefined;

    // Get the first character, handling Unicode if necessary
    const firstCharacter = splitResult ? splitResult[0] : normalizedString.charAt(0);

    // Get the rest of the string, handling Unicode if necessary
    const restOfString = splitResult ? e2A(splitResult, 1).join("") : normalizedString.slice(1);

    // Apply the specified method to the first character and concatenate with the rest
    return firstCharacter[methodName]() + restOfString;
  };
}

module.exports = capitalizeWithMethod;