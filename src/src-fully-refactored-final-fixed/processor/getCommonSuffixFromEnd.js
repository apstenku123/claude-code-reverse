/**
 * Returns the common suffix from the end of the first string that matches the end of the second string.
 * If either string is empty or their last characters do not match, returns an empty string.
 *
 * @param {string} firstString - The first string to compare.
 * @param {string} secondString - The second string to compare.
 * @returns {string} The common suffix from the end of the first string that matches the end of the second string.
 */
function getCommonSuffixFromEnd(firstString, secondString) {
  // Validate input: both strings must be non-empty and their last characters must match
  if (!firstString || !secondString || firstString[firstString.length - 1] !== secondString[secondString.length - 1]) {
    return "";
  }

  // Initialize the counter for matching characters from the end
  let matchingSuffixLength = 0;

  // Iterate from the end of both strings, comparing characters
  while (
    matchingSuffixLength < firstString.length &&
    matchingSuffixLength < secondString.length
  ) {
    const firstChar = firstString[firstString.length - (matchingSuffixLength + 1)];
    const secondChar = secondString[secondString.length - (matchingSuffixLength + 1)];
    if (firstChar !== secondChar) {
      // Return the matching suffix found so far
      return firstString.slice(-matchingSuffixLength);
    }
    matchingSuffixLength++;
  }

  // All compared characters matched; return the full matching suffix
  return firstString.slice(-matchingSuffixLength);
}

module.exports = getCommonSuffixFromEnd;