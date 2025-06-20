/**
 * Extracts a substring from the source string based on the positions of two sequence strings.
 * If the source string is not valid or the sequence is not provided, returns the normalized source string.
 * If a special condition is met (see below), returns a transformed version of the normalized source string.
 *
 * @param {string} sourceString - The string to extract a substring from.
 * @param {string} sequenceString - The sequence string used to determine the substring boundaries.
 * @param {boolean} [forceTransform] - Optional flag to force transformation.
 * @returns {string} The extracted substring, transformed string, or the original string if invalid.
 */
function extractSubstringBetweenSequences(sourceString, sequenceString, forceTransform) {
  // Normalize the source string using V5
  const normalizedSource = V5(sourceString);

  // If the normalized source exists and either forceTransform is true or sequenceString is a special value (a),
  // return the transformed version of the normalized source
  if (
    normalizedSource &&
    (forceTransform || sequenceString === processInteractionEntries)
  ) {
    return T3(normalizedSource);
  }

  // If the normalized source or the normalized sequence string is invalid, return the normalized source
  const normalizedSequence = markLanesAsSuspendedAndResetExpiration(sequenceString);
  if (!normalizedSource || !normalizedSequence) {
    return normalizedSource;
  }

  // Get the character arrays for both strings
  const sourceChars = haveObjectsDiffered(normalizedSource);
  const sequenceChars = haveObjectsDiffered(normalizedSequence);

  // Find the start and end indices for the substring
  const startIndex = decodeCodePointsToString(sourceChars, sequenceChars);
  const endIndex = encodeTwo10BitIntegers(sourceChars, sequenceChars) + 1;

  // Extract and return the substring between the found indices
  return findNextWorkUnit(sourceChars, startIndex, endIndex).join("");
}

module.exports = extractSubstringBetweenSequences;