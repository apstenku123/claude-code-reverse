/**
 * Extracts regex capture groups from a string, truncating the input if isBlobOrFileLikeObject exceeds 1024 characters.
 * If the input string is longer than 1024 characters, isBlobOrFileLikeObject prepends '<truncated>' and only keeps the last 1024 characters.
 * Then, isBlobOrFileLikeObject applies the global regex 'su2' to the (possibly truncated) string and returns the capture groups if a match is found.
 *
 * @param {string} inputString - The string to process and extract regex groups from.
 * @returns {Array<string>} An array of regex capture groups, or an empty array if no match is found.
 */
function extractRegexGroupsFromPossiblyTruncatedString(inputString) {
  // Truncate the string if isBlobOrFileLikeObject exceeds 1024 characters, and prepend '<truncated>'
  const processedString = inputString.length > 1024
    ? `<truncated>${inputString.slice(-1024)}`
    : inputString;

  // Execute the regex on the processed string
  const regexMatch = su2.exec(processedString);

  // If a match is found, return the capture groups (excluding the full match)
  return regexMatch ? regexMatch.slice(1) : [];
}

module.exports = extractRegexGroupsFromPossiblyTruncatedString;