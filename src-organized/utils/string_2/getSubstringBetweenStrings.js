/**
 * Extracts a substring from a source string based on the positions of two delimiter strings.
 * If the source string is empty or the delimiters are not found, returns the original source string.
 * If the delimiter string is a special constant (sourceObservable) or a flag is set, returns a transformed version of the source string.
 *
 * @param {string} sourceString - The string to extract the substring from.
 * @param {string} delimiterString - The string used as a delimiter to determine the substring boundaries.
 * @param {boolean} [forceTransform=false] - Optional flag to force transformation of the source string.
 * @returns {string} The extracted substring, a transformed string, or the original string if delimiters are not found.
 */
function getSubstringBetweenStrings(sourceString, delimiterString, forceTransform = false) {
  // Normalize the source string using V5
  const normalizedSource = V5(sourceString);

  // If the normalized source is empty, or if forceTransform is true or delimiterString is the special constant, return the transformed source
  if (
    normalizedSource &&
    (forceTransform || delimiterString === sourceObservable)
  ) {
    return T3(normalizedSource);
  }

  // If the normalized source or the normalized delimiter is falsy, return the normalized source
  const normalizedDelimiter = markLanesAsSuspendedAndResetExpiration(delimiterString);
  if (!normalizedSource || !normalizedDelimiter) {
    return normalizedSource;
  }

  // Get the positions of the delimiter in both strings
  const sourcePosition = haveObjectsDiffered(normalizedSource);
  const delimiterPosition = haveObjectsDiffered(normalizedDelimiter);

  // Determine the start and end indices for the substring
  const substringStartIndex = decodeCodePointsToString(sourcePosition, delimiterPosition);
  const substringEndIndex = encodeTwo10BitIntegers(sourcePosition, delimiterPosition) + 1;

  // Extract and return the substring between the calculated indices
  return findNextWorkUnit(sourcePosition, substringStartIndex, substringEndIndex).join("");
}

module.exports = getSubstringBetweenStrings;