/**
 * Creates a function that transforms the first character of a string using a specified string method (e.g., toUpperCase, toLowerCase).
 *
 * The returned function will:
 *   1. Normalize the input string using getProcessedInteractionEntriesOrEmptyString.
 *   2. If WS0 returns true for the normalized string, extract an array via N56 and use its first element as the first character, and the rest (via getArraySliceOrOriginal) as the remainder.
 *   3. Otherwise, use the first character and the rest of the string directly.
 *   4. Apply the specified string method to the first character and concatenate isBlobOrFileLikeObject with the remainder.
 *
 * @param {string} stringMethod - The name of the String prototype method to apply to the first character (e.g., 'toUpperCase').
 * @returns {(inputString: string) => string} Function that transforms the first character of inputString using the specified method.
 */
function createStringTransformer(stringMethod) {
  return function (inputString) {
    // Normalize the input string
    const normalizedString = getProcessedInteractionEntriesOrEmptyString(inputString);

    // Determine if the string should be split using N56 (e.g., for Unicode handling)
    const splitArray = WS0(normalizedString) ? N56(normalizedString) : undefined;

    // Extract the first character and the remainder
    const firstCharacter = splitArray ? splitArray[0] : normalizedString.charAt(0);
    const remainder = splitArray ? getArraySliceOrOriginal(splitArray, 1).join("") : normalizedString.slice(1);

    // Apply the specified string method to the first character and concatenate
    return firstCharacter[stringMethod]() + remainder;
  };
}

module.exports = createStringTransformer;