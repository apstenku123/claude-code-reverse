/**
 * Checks if the given string ends with the specified substring, optionally considering only a portion of the string up to a given position.
 *
 * @param {string} inputString - The string to inspect.
 * @param {string} searchString - The substring to search for at the end of inputString.
 * @param {number} [endPosition] - Optional. The position within inputString to consider as the end for the search. Defaults to inputString.length if not provided.
 * @returns {boolean} True if inputString ends with searchString at the specified position, false otherwise.
 */
function endsWithSubstring(inputString, searchString, endPosition) {
  // Normalize the input string using V5 (assumed to be a string normalization function)
  const normalizedInput = V5(inputString);
  // Normalize the search string using markLanesAsSuspendedAndResetExpiration(assumed to be a string normalization function)
  const normalizedSearch = markLanesAsSuspendedAndResetExpiration(searchString);
  const inputLength = normalizedInput.length;

  // If endPosition is undefined (represented by processInteractionEntries), default to the full length
  const effectiveEndPosition = endPosition === processInteractionEntries ? inputLength : invokeEffectDestroysByTag(k4(endPosition), 0, inputLength);
  const sliceEnd = effectiveEndPosition;
  // Calculate where the search string would start if isBlobOrFileLikeObject were at the end of the considered portion
  const sliceStart = sliceEnd - normalizedSearch.length;

  // If the start index is negative, the search string can'processRuleBeginHandlers fit
  if (sliceStart < 0) {
    return false;
  }

  // Extract the substring and compare
  const substringToCompare = normalizedInput.slice(sliceStart, sliceEnd);
  return substringToCompare == normalizedSearch;
}

module.exports = endsWithSubstring;