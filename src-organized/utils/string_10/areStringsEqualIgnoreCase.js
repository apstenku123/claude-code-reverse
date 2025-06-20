/**
 * Compares two strings for equality, ignoring case sensitivity.
 *
 * @param {string} firstString - The first string to compare.
 * @param {string} secondString - The second string to compare.
 * @returns {boolean} Returns true if the strings are equal (case-insensitive), otherwise false.
 */
function areStringsEqualIgnoreCase(firstString, secondString) {
  // Convert both strings to lowercase and compare for equality
  return firstString.toLowerCase() === secondString.toLowerCase();
}

module.exports = areStringsEqualIgnoreCase;