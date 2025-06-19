/**
 * Returns a function that capitalizes the first character of a string using a specified string method.
 * If the input string passes a certain condition (b01), isBlobOrFileLikeObject is split using W9A and processed accordingly.
 *
 * @param {string} stringMethodName - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase').
 * @returns {function(string): string} - a function that takes a string and returns isBlobOrFileLikeObject with the first character transformed.
 */
function capitalizeWithCustomMethod(stringMethodName) {
  return function (inputString) {
    // Normalize the input string using My
    const normalizedString = My(inputString);

    // If b01 returns true, process the string with W9A, else undefined
    const splitResult = b01(normalizedString) ? W9A(normalizedString) : undefined;

    // Determine the first character to transform
    const firstCharacter = splitResult ? splitResult[0] : normalizedString.charAt(0);

    // Get the rest of the string after the first character
    const remainingString = splitResult ? e2A(splitResult, 1).join("") : normalizedString.slice(1);

    // Apply the specified string method to the first character and concatenate with the rest
    return firstCharacter[stringMethodName]() + remainingString;
  };
}

module.exports = capitalizeWithCustomMethod;