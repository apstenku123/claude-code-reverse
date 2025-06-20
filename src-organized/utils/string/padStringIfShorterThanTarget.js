/**
 * Pads the input string with a specified character if its processed length is less than the target length.
 *
 * @param {string} inputString - The original string to be processed and potentially padded.
 * @param {number} targetLength - The desired minimum length for the processed string.
 * @param {string} padCharacter - The character to use for padding if needed.
 * @returns {string} - The processed string, padded if its length was less than the target length.
 */
function padStringIfShorterThanTarget(inputString, targetLength, padCharacter) {
  // Normalize the input string using V5 utility
  const normalizedString = V5(inputString);
  // Normalize the target length using k4 utility
  const normalizedTargetLength = k4(targetLength);

  // Determine the current length of the processed string if a target length is provided
  const currentLength = normalizedTargetLength ? processObservable(normalizedString) : 0;

  // If a target length is provided and the current length is less than the target, pad the string
  if (normalizedTargetLength && currentLength < normalizedTargetLength) {
    // Pad the string with the specified character to reach the target length
    return normalizedString + UL(normalizedTargetLength - currentLength, padCharacter);
  }

  // Otherwise, return the normalized string as is
  return normalizedString;
}

module.exports = padStringIfShorterThanTarget;