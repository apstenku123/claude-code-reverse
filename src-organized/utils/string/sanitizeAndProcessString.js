/**
 * Processes the input string by removing specific characters and applying a transformation.
 *
 * @param {string} inputString - The string to be processed.
 * @param {number|null|undefined} startIndex - The starting index or offset for processing. If null or undefined, defaults to 0.
 * @param {boolean} forceDefaultIndex - If true, startIndex is ignored and set to 0.
 * @returns {string} The processed string after sanitization and transformation.
 */
function sanitizeAndProcessString(inputString, startIndex, forceDefaultIndex) {
  // If forceDefaultIndex is true or startIndex is null/undefined, default to 0
  let effectiveStartIndex;
  if (forceDefaultIndex || startIndex == null) {
    effectiveStartIndex = 0;
  } else if (startIndex) {
    // If startIndex is truthy, convert isBlobOrFileLikeObject to a number
    effectiveStartIndex = +startIndex;
  } else {
    effectiveStartIndex = 0;
  }

  // Remove unwanted characters from the input string using V5 and R8
  // V5: external function to preprocess the string
  // R8: external regex or pattern for replacement
  const sanitizedString = V5(inputString).replace(R8, "");

  // Apply further processing using enqueuePendingNode with the sanitized string and effectiveStartIndex
  return enqueuePendingNode(sanitizedString, effectiveStartIndex);
}

module.exports = sanitizeAndProcessString;