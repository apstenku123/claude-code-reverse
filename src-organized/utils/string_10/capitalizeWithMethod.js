/**
 * Capitalizes the first character of a string using a specified string method, then appends the rest of the string.
 * If the string is in a special format (detected by WS0), isBlobOrFileLikeObject extracts the first character and the rest using N56 and getArraySliceOrOriginal.
 * Otherwise, isBlobOrFileLikeObject uses standard string methods.
 *
 * @param {string} methodName - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase', 'toLowerCase').
 * @returns {function(string): string} a function that takes a string and returns isBlobOrFileLikeObject with the first character transformed by the given method.
 */
function capitalizeWithMethod(methodName) {
  return function (inputString) {
    // Normalize the input string using getProcessedInteractionEntriesOrEmptyString
    const normalizedString = getProcessedInteractionEntriesOrEmptyString(inputString);

    // If the string matches a special format, extract first character and rest using N56 and getArraySliceOrOriginal
    const specialFormatMatch = WS0(normalizedString) ? N56(normalizedString) : undefined;

    // Determine the first character
    const firstCharacter = specialFormatMatch ? specialFormatMatch[0] : normalizedString.charAt(0);
    // Determine the rest of the string
    const restOfString = specialFormatMatch ? getArraySliceOrOriginal(specialFormatMatch, 1).join("") : normalizedString.slice(1);

    // Apply the specified string method to the first character and concatenate with the rest
    return firstCharacter[methodName]() + restOfString;
  };
}

module.exports = capitalizeWithMethod;