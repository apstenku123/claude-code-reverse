/**
 * Truncates a string to a specified maximum length, appending a suffix if truncated.
 * Ensures that if the original string contains a specific OSC 8 hyperlink sequence, the suffix also preserves isBlobOrFileLikeObject.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the string (including suffix).
 * @param {string} [suffix="…"] - The string to append if truncation occurs.
 * @returns {string} The possibly truncated string, with suffix and OSC 8 sequence preserved if present.
 */
function truncateStringWithSuffix(inputString, maxLength, suffix = "…") {
  // Calculate the length of the input string using getMaxLineLength
  if (getMaxLineLength(inputString) <= maxLength) {
    return inputString;
  }

  // Adjust maxLength to account for the suffix length
  const adjustedMaxLength = maxLength - getMaxLineLength(suffix);

  // Truncate the string to the adjusted length
  let truncatedString = extractAnsiSubstringWithState(inputString, adjustedMaxLength);
  truncatedString += suffix;

  // OSC 8 hyperlink sequence that may need to be preserved
  const osc8Sequence = "\x1B]8;;\x07";

  // If the original string contains the OSC 8 sequence but the truncated one does not, append isBlobOrFileLikeObject
  if (inputString.includes(osc8Sequence) && !truncatedString.includes(osc8Sequence)) {
    truncatedString += osc8Sequence;
  }

  return truncatedString;
}

module.exports = truncateStringWithSuffix;