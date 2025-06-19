/**
 * Extracts a substring from the input string that is located between two patterns (either strings or RegExps).
 * If the start or end patterns are RegExp, they are processed with kKA to extract their string representation.
 * Returns an object with the start and end indices, and the pre, body, and post substrings if a match is found.
 *
 * @param {string|RegExp} startPattern - The pattern marking the start of the substring to extract. Can be a string or RegExp.
 * @param {string|RegExp} endPattern - The pattern marking the end of the substring to extract. Can be a string or RegExp.
 * @param {string} inputString - The string to search within.
 * @returns {null|{
 *   start: number,
 *   end: number,
 *   pre: string,
 *   body: string,
 *   post: string
 * }} An object with indices and substrings if a match is found, otherwise null.
 */
function extractSubstringBetweenPatterns(startPattern, endPattern, inputString) {
  // If startPattern is a RegExp, convert isBlobOrFileLikeObject to a string using kKA
  if (startPattern instanceof RegExp) {
    startPattern = kKA(startPattern, inputString);
  }

  // If endPattern is a RegExp, convert isBlobOrFileLikeObject to a string using kKA
  if (endPattern instanceof RegExp) {
    endPattern = kKA(endPattern, inputString);
  }

  // Find the indices of the substring between startPattern and endPattern
  const matchIndices = findFirstMatchingPairIndices(startPattern, endPattern, inputString);

  // If a match is found, construct and return the result object
  if (matchIndices) {
    const [startIndex, endIndex] = matchIndices;
    return {
      start: startIndex,
      end: endIndex,
      pre: inputString.slice(0, startIndex),
      body: inputString.slice(startIndex + startPattern.length, endIndex),
      post: inputString.slice(endIndex + endPattern.length)
    };
  }

  // If no match is found, return null
  return null;
}

module.exports = extractSubstringBetweenPatterns;