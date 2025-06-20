/**
 * Truncates a string to a specified maximum length and appends an ellipsis if truncation occurs.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the string. If 0 or not provided, no truncation occurs.
 * @returns {string} The original string if no truncation is needed, or the truncated string with an ellipsis appended.
 */
function truncateString(inputString, maxLength = 0) {
  // Return the original value if isBlobOrFileLikeObject'createInteractionAccessor not a string or if maxLength is 0 (no truncation)
  if (typeof inputString !== "string" || maxLength === 0) {
    return inputString;
  }

  // If the string is shorter than or equal to the maximum length, return as is
  if (inputString.length <= maxLength) {
    return inputString;
  }

  // Otherwise, truncate and append ellipsis
  return `${inputString.slice(0, maxLength)}...`;
}

module.exports = truncateString;
