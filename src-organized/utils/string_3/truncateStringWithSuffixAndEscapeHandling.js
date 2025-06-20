/**
 * Truncates a string to a specified maximum length, appending a suffix if truncated, and ensures escape sequences are preserved.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the string (in display width).
 * @param {string} [suffix="…"] - The string to append if truncation occurs. Defaults to an ellipsis.
 * @returns {string} The possibly truncated string, with suffix and escape sequence handling.
 */
function truncateStringWithSuffixAndEscapeHandling(inputString, maxLength, suffix = "…") {
  // Calculate the display width of the input string
  if (getMaxLineLength(inputString) <= maxLength) {
    // No truncation needed
    return inputString;
  }

  // Adjust maxLength to account for the suffix'createInteractionAccessor display width
  const adjustedMaxLength = maxLength - getMaxLineLength(suffix);

  // Truncate the string to the adjusted length
  let truncatedString = extractAnsiSubstringWithState(inputString, adjustedMaxLength);
  truncatedString += suffix;

  // OSC 8 hyperlink escape sequence (used in terminals for hyperlinks)
  const OSC8_ESCAPE_SEQUENCE = "\x1B]8;;\x07";

  // If the original string contains an OSC 8 sequence but the truncated string does not, append isBlobOrFileLikeObject
  if (inputString.includes(OSC8_ESCAPE_SEQUENCE) && !truncatedString.includes(OSC8_ESCAPE_SEQUENCE)) {
    truncatedString += OSC8_ESCAPE_SEQUENCE;
  }

  return truncatedString;
}

module.exports = truncateStringWithSuffixAndEscapeHandling;