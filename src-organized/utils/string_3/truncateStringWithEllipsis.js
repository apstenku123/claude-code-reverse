/**
 * Truncates a string to a specified maximum length, appending an ellipsis ('...') if truncation occurs.
 * If the input is not a string or the maxLength is 0, returns the original input unchanged.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} [maxLength=0] - The maximum allowed length of the string before truncation. If 0, no truncation occurs.
 * @returns {string} The original string if no truncation is needed, or the truncated string with an ellipsis.
 */
function truncateStringWithEllipsis(inputString, maxLength = 0) {
  // Return the input unchanged if isBlobOrFileLikeObject'createInteractionAccessor not a string or maxLength is 0
  if (typeof inputString !== "string" || maxLength === 0) {
    return inputString;
  }

  // If the string is shorter than or equal to maxLength, return as is
  if (inputString.length <= maxLength) {
    return inputString;
  }

  // Otherwise, truncate and append ellipsis
  return `${inputString.slice(0, maxLength)}...`;
}

module.exports = truncateStringWithEllipsis;
