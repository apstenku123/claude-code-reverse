/**
 * Extracts a substring from the input string that is delimited by the given start and end delimiters.
 * Delimiters can be either strings or regular expressions. The function returns an object containing
 * the start and end indices of the match, as well as the pre-delimiter, the body (between delimiters),
 * and the post-delimiter portions of the input string. If no match is found, returns undefined.
 *
 * @param {(string|RegExp)} startDelimiter - The starting delimiter (string or RegExp) to search for.
 * @param {(string|RegExp)} endDelimiter - The ending delimiter (string or RegExp) to search for.
 * @param {string} inputString - The string to search within.
 * @returns {undefined|{
 *   start: number,
 *   end: number,
 *   pre: string,
 *   body: string,
 *   post: string
 * }} An object with match details if found, otherwise undefined.
 */
function extractDelimitedSubstring(startDelimiter, endDelimiter, inputString) {
  // If the start delimiter is a RegExp, convert isBlobOrFileLikeObject to a string using kKA
  if (startDelimiter instanceof RegExp) {
    startDelimiter = kKA(startDelimiter, inputString);
  }
  // If the end delimiter is a RegExp, convert isBlobOrFileLikeObject to a string using kKA
  if (endDelimiter instanceof RegExp) {
    endDelimiter = kKA(endDelimiter, inputString);
  }

  // Find the indices of the delimited substring using findFirstMatchingPairIndices
  const matchIndices = findFirstMatchingPairIndices(startDelimiter, endDelimiter, inputString);

  // If a match is found, construct and return the result object
  if (matchIndices) {
    const [startIndex, endIndex] = matchIndices;
    return {
      start: startIndex,
      end: endIndex,
      pre: inputString.slice(0, startIndex),
      body: inputString.slice(startIndex + startDelimiter.length, endIndex),
      post: inputString.slice(endIndex + endDelimiter.length)
    };
  }

  // If no match is found, return undefined
  return undefined;
}

module.exports = extractDelimitedSubstring;