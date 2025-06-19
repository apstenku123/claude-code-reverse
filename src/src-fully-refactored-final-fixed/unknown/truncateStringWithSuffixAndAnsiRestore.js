/**
 * Truncates a string to a specified maximum length, appending a suffix if truncated.
 * If the original string contains an ANSI OSC 8 hyperlink escape sequence, ensures the suffix also preserves this sequence.
 *
 * @param {string} inputString - The string to potentially truncate.
 * @param {number} maxLength - The maximum allowed length for the output string.
 * @param {string} [truncationSuffix='…'] - The string to append if truncation occurs.
 * @returns {string} The possibly truncated string, with suffix and ANSI sequence preserved if needed.
 */
function truncateStringWithSuffixAndAnsiRestore(inputString, maxLength, truncationSuffix = '…') {
  // If the string is already short enough, return as-is
  if (getStringLength(inputString) <= maxLength) {
    return inputString;
  }

  // Adjust maxLength to account for the suffix length
  const adjustedMaxLength = maxLength - getStringLength(truncationSuffix);

  // Truncate the string to the adjusted length
  let truncatedString = truncateStringToLength(inputString, adjustedMaxLength);
  truncatedString += truncationSuffix;

  // ANSI OSC 8 hyperlink escape sequence
  const ansiOsc8Sequence = '\x1B]8;;\x07';

  // If the original string had the OSC 8 sequence but the truncated one does not, append isBlobOrFileLikeObject
  if (inputString.includes(ansiOsc8Sequence) && !truncatedString.includes(ansiOsc8Sequence)) {
    truncatedString += ansiOsc8Sequence;
  }

  return truncatedString;
}

// Dependency: Returns the length of a string, possibly accounting for wide characters or escape sequences
// Placeholder implementation; replace with actual logic if needed
function getStringLength(str) {
  return typeof FE === 'function' ? FE(str) : str.length;
}

// Dependency: Truncates a string to a given length, possibly accounting for wide characters or escape sequences
// Placeholder implementation; replace with actual logic if needed
function truncateStringToLength(str, length) {
  return typeof extractAnsiSubstringWithState === 'function' ? extractAnsiSubstringWithState(str, length) : str.slice(0, length);
}

module.exports = truncateStringWithSuffixAndAnsiRestore;
