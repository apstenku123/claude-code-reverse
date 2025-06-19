/**
 * Searches an array of strings and returns the first string that contains the specified substring.
 *
 * @param {string[]} stringArray - The array of strings to search through.
 * @param {string} substring - The substring to look for within each string.
 * @returns {string|null} The first string containing the substring, or null if none is found.
 */
function findStringContainingSubstring(stringArray, substring) {
  // Use Array.prototype.find to locate the first string that includes the substring
  const foundString = stringArray.find(currentString => currentString.includes(substring));
  // If no string is found, return null
  return foundString ?? null;
}

module.exports = findStringContainingSubstring;