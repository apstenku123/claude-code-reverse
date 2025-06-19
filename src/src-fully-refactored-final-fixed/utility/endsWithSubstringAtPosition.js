/**
 * Checks if the given string ends with the specified substring at a given position.
 *
 * @param {string} inputString - The string to inspect.
 * @param {string} searchString - The substring to search for at the end of inputString.
 * @param {number} [position] - The position in inputString to consider as the end. Defaults to inputString.length if not provided.
 * @returns {boolean} True if inputString ends with searchString at the specified position, false otherwise.
 */
function endsWithSubstringAtPosition(inputString, searchString, position) {
  // Normalize the input string using V5 (assumed to be a string normalization function)
  const normalizedInput = V5(inputString);
  // Normalize the search string using markLanesAsSuspendedAndResetExpiration(assumed to be a string normalization function)
  const normalizedSearch = markLanesAsSuspendedAndResetExpiration(searchString);
  const inputLength = normalizedInput.length;

  // If position is undefined (a), default to the end of the string
  const effectivePosition = position === processInteractionEntries ? inputLength : invokeEffectDestroysByTag(k4(position), 0, inputLength);
  // Calculate the start index for the substring comparison
  const endPosition = effectivePosition;
  const startPosition = endPosition - normalizedSearch.length;

  // Ensure startPosition is valid and compare the substring
  return startPosition >= 0 && normalizedInput.slice(startPosition, endPosition) === normalizedSearch;
}

module.exports = endsWithSubstringAtPosition;