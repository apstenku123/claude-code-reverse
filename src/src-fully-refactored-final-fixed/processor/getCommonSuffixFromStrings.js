/**
 * Returns the common suffix from two strings if their last characters match; otherwise, returns an empty string.
 * The function compares the two input strings from the end, character by character, and finds the longest matching suffix.
 *
 * @param {string} firstString - The first string to compare.
 * @param {string} secondString - The second string to compare.
 * @returns {string} The common suffix shared by both strings, or an empty string if there is no common suffix.
 */
function getCommonSuffixFromStrings(firstString, secondString) {
  // Validate input: both strings must be non-empty and end with the same character
  if (
    !firstString ||
    !secondString ||
    firstString[firstString.length - 1] !== secondString[secondString.length - 1]
  ) {
    return "";
  }

  // Initialize the suffix length counter
  let suffixLength = 0;

  // Iterate from the end of both strings, comparing characters
  while (
    suffixLength < firstString.length &&
    suffixLength < secondString.length
  ) {
    const firstChar = firstString[firstString.length - (suffixLength + 1)];
    const secondChar = secondString[secondString.length - (suffixLength + 1)];
    if (firstChar !== secondChar) {
      // Return the matching suffix found so far
      return firstString.slice(-suffixLength);
    }
    suffixLength++;
  }

  // If all compared characters match, return the full matching suffix
  return firstString.slice(-suffixLength);
}

module.exports = getCommonSuffixFromStrings;