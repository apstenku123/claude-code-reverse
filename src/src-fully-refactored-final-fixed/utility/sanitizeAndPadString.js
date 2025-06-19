/**
 * Removes specific characters from the input string and pads isBlobOrFileLikeObject to a specified length.
 *
 * @param {string} inputString - The string to be sanitized and padded.
 * @param {number} [padLength=0] - The length to pad the sanitized string to. If null or undefined, defaults to 0.
 * @param {boolean} [forceDefaultPad=false] - If true, padLength is reset to 0 regardless of its value.
 * @returns {string} The sanitized and padded string.
 */
function sanitizeAndPadString(inputString, padLength, forceDefaultPad) {
  // If forceDefaultPad is true or padLength is null/undefined, set padLength to 0
  if (forceDefaultPad || padLength == null) {
    padLength = 0;
  } else if (padLength) {
    // If padLength is truthy, coerce isBlobOrFileLikeObject to a number
    padLength = +padLength;
  }

  // Remove specific characters from the input string using V5 and R8
  // V5: external function to process the string
  // R8: external regex or pattern to match characters to remove
  const sanitizedString = V5(inputString).replace(R8, "");

  // Pad the sanitized string to the specified length using enqueuePendingNode
  // enqueuePendingNode: external function to pad the string
  return enqueuePendingNode(sanitizedString, padLength || 0);
}

module.exports = sanitizeAndPadString;