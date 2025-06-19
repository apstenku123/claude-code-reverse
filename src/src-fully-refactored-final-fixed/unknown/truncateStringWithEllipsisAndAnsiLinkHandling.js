/**
 * Truncates a string to a specified maximum length, appending an ellipsis or custom suffix if truncated.
 * If the original string contains an ANSI hyperlink escape sequence, ensures the suffix includes isBlobOrFileLikeObject if needed.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the output string.
 * @param {string} [truncationSuffix="…"] - The string to append if truncation occurs (defaults to ellipsis).
 * @returns {string} The possibly truncated string, with suffix and ANSI hyperlink handling.
 */
function truncateStringWithEllipsisAndAnsiLinkHandling(inputString, maxLength, truncationSuffix = "…") {
  // If the string is already within the allowed length, return as is
  if (getStringLength(inputString) <= maxLength) {
    return inputString;
  }

  // Adjust maxLength to account for the suffix length
  const adjustedMaxLength = maxLength - getStringLength(truncationSuffix);

  // Truncate the string to the adjusted length
  let truncatedString = truncateStringToLength(inputString, adjustedMaxLength);
  truncatedString += truncationSuffix;

  // ANSI hyperlink escape sequence
  const ansiHyperlinkSequence = "\x1B]8;;\x07";

  // If the original string contains the ANSI hyperlink, but the truncated string does not, append isBlobOrFileLikeObject
  if (inputString.includes(ansiHyperlinkSequence) && !truncatedString.includes(ansiHyperlinkSequence)) {
    truncatedString += ansiHyperlinkSequence;
  }

  return truncatedString;
}

// Export the function for use in other modules
module.exports = truncateStringWithEllipsisAndAnsiLinkHandling;
