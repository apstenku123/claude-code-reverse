/**
 * Extracts a substring from the input string that lies between two pattern strings.
 * If the input string is empty or the patterns are not found, returns the original string.
 * If the input string is valid and either the endPattern is not provided or is a special default (sourceObservable),
 * returns the result of processing the input string with transformString.
 *
 * @param {string} inputString - The string to extract a substring from.
 * @param {string} endPattern - The pattern marking the end of the substring to extract.
 * @param {boolean} [forceTransform=false] - If true, always transform the string regardless of endPattern.
 * @returns {string} The extracted substring, or the transformed string, or the original string if patterns are not found.
 */
function extractSubstringBetweenPatterns(inputString, endPattern, forceTransform = false) {
  // Normalize the input string (e.g., trim, validate, or preprocess)
  const normalizedInput = V5(inputString);

  // If the input is valid and either forceTransform is true or endPattern is the default (sourceObservable),
  // return the transformed string
  if (
    normalizedInput &&
    (forceTransform || endPattern === sourceObservable)
  ) {
    return transformString(normalizedInput);
  }

  // If input or endPattern is invalid, return the input as is
  if (!normalizedInput || !(endPattern = normalizePattern(endPattern))) {
    return normalizedInput;
  }

  // Get the start and end indices for substring extraction
  const inputChars = getCharArray(normalizedInput);
  const patternChars = getCharArray(endPattern);
  const startIdx = findPatternStartIndex(inputChars, patternChars);
  const endIdx = findPatternEndIndex(inputChars, patternChars) + 1;

  // Extract and return the substring between the patterns
  return extractSubstring(inputChars, startIdx, endIdx).join("");
}

// Export the function for use in other modules
module.exports = extractSubstringBetweenPatterns;