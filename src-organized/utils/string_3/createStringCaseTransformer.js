/**
 * Creates a function that transforms the first character of a string using a specified string method (e.g., toUpperCase, toLowerCase).
 * Handles special cases where the string may be represented as an array (e.g., due to Unicode or custom logic).
 *
 * @param {string} stringMethodName - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase').
 * @returns {function(string): string} - a function that takes a string, transforms its first character, and returns the new string.
 */
function createStringCaseTransformer(stringMethodName) {
  return function (inputString) {
    // Normalize the input string using the external My function
    const normalizedString = My(inputString);

    // Determine if the string should be split into an array (e.g., for special Unicode handling)
    const charArray = b01(normalizedString) ? W9A(normalizedString) : undefined;

    // Get the first character, either from the array or the string directly
    const firstChar = charArray ? charArray[0] : normalizedString.charAt(0);

    // Get the rest of the string, either from the array or the string directly
    const restOfString = charArray ? e2A(charArray, 1).join("") : normalizedString.slice(1);

    // Apply the specified string method to the first character and concatenate with the rest
    return firstChar[stringMethodName]() + restOfString;
  };
}

module.exports = createStringCaseTransformer;