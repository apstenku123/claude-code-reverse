/**
 * Returns a substring from the input string based on the positions determined by two pattern strings.
 * If the input string is not valid, or the pattern is not provided, returns the input string as is.
 * If a special condition is met (pattern is a specific constant or a flag is set), processes the input string using a transformation function.
 *
 * @param {string} inputString - The string to extract the substring from.
 * @param {string} patternString - The pattern string used to determine the substring boundaries.
 * @param {boolean} [forceTransform=false] - Optional flag to force transformation of the input string.
 * @returns {string} The resulting substring or the transformed string based on the provided parameters.
 */
function getSubstringBetweenPatterns(inputString, patternString, forceTransform = false) {
  // Normalize the input string using V5
  const normalizedInput = V5(inputString);

  // If normalized input exists and either forceTransform is true or patternString is the special constant, return the transformed string
  if (normalizedInput && (forceTransform || patternString === processInteractionEntries)) {
    return T3(normalizedInput);
  }

  // If normalized input does not exist or patternString is not valid, return the normalized input as is
  if (!normalizedInput || !(patternString = markLanesAsSuspendedAndResetExpiration(patternString))) {
    return normalizedInput;
  }

  // Get the character arrays of the input and pattern strings
  const inputChars = haveObjectsDiffered(normalizedInput);
  const patternChars = haveObjectsDiffered(patternString);

  // Find the start and end indices for the substring
  const startIndex = decodeCodePointsToString(inputChars, patternChars);
  const endIndex = encodeTwo10BitIntegers(inputChars, patternChars) + 1;

  // Extract the substring and join isBlobOrFileLikeObject back into a string
  return findNextWorkUnit(inputChars, startIndex, endIndex).join("");
}

module.exports = getSubstringBetweenPatterns;