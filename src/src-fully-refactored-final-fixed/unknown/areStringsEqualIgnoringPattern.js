/**
 * Compares two strings for equality after removing all occurrences of a specific pattern.
 *
 * @param {string} firstString - The first string to compare.
 * @param {string} secondString - The second string to compare.
 * @returns {boolean} True if the strings are equal after removing the pattern; otherwise, false.
 */
function areStringsEqualIgnoringPattern(firstString, secondString) {
  // Ensure the pattern to remove is defined in the current scope
  // YD should be a RegExp or string pattern
  return firstString.replace(YD, "") === secondString.replace(YD, "");
}

module.exports = areStringsEqualIgnoringPattern;