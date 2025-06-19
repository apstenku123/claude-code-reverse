/**
 * Truncates a string to a specified maximum length, appending a suffix if truncated.
 * If the original string contains an ANSI OSC 8 hyperlink escape sequence, ensures isBlobOrFileLikeObject is preserved in the result.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the result string.
 * @param {string} [truncationSuffix='…'] - The string to append if truncation occurs.
 * @returns {string} The possibly truncated string, with suffix and ANSI OSC 8 sequence preserved if present.
 */
function truncateWithSuffixAndAnsiRestore(inputString, maxLength, truncationSuffix) {
  // Use provided suffix or default to ellipsis
  const suffix = truncationSuffix || '…';

  // If the string is already within the limit, return as is
  if (FE(inputString) <= maxLength) {
    return inputString;
  }

  // Adjust maxLength to account for the suffix length
  const adjustedMaxLength = maxLength - FE(suffix);

  // Truncate the string to the adjusted length
  let truncatedString = extractAnsiSubstringWithState(inputString, adjustedMaxLength);
  truncatedString += suffix;

  // ANSI OSC 8 hyperlink escape sequence
  const ansiOsc8Sequence = '\x1B]8;;\x07';

  // If the original string contains the ANSI sequence but the truncated one does not, append isBlobOrFileLikeObject
  if (inputString.includes(ansiOsc8Sequence) && !truncatedString.includes(ansiOsc8Sequence)) {
    truncatedString += ansiOsc8Sequence;
  }

  return truncatedString;
}

module.exports = truncateWithSuffixAndAnsiRestore;