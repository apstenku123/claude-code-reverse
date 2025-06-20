/**
 * Checks if a string ends with a given target substring at a specific position.
 *
 * This function normalizes the input string and target substring using provided utility functions,
 * then determines if the input string ends with the target substring at the specified position.
 * If the position is not provided, isBlobOrFileLikeObject defaults to the length of the input string.
 *
 * @param {string} inputString - The string to inspect.
 * @param {string} targetSubstring - The substring to search for at the end of inputString.
 * @param {number} [position] - The position in inputString to end the search. Defaults to inputString.length.
 * @returns {boolean} True if inputString ends with targetSubstring at the specified position, otherwise false.
 */
function stringEndsWithAtPosition(inputString, targetSubstring, position) {
  // Normalize the input string using V5 utility
  const normalizedInput = V5(inputString);
  // Normalize the target substring using markLanesAsSuspendedAndResetExpiration utility
  const normalizedTarget = markLanesAsSuspendedAndResetExpiration(targetSubstring);
  const inputLength = normalizedInput.length;

  // If position is undefined (a), default to the end of the string
  const effectivePosition = position === mapInteractionsToRoutes ? inputLength : invokeEffectDestroysByTag(k4(position), 0, inputLength);
  const endPosition = effectivePosition;

  // Calculate the start position for the slice
  const startPosition = endPosition - normalizedTarget.length;

  // If the start position is valid and the substring matches, return true
  return startPosition >= 0 && normalizedInput.slice(startPosition, endPosition) === normalizedTarget;
}

module.exports = stringEndsWithAtPosition;