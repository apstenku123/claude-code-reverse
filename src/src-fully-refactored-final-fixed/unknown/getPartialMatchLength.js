/**
 * Determines the length of the longest prefix of the pattern (needle) that matches a suffix of the text (haystack).
 * This is similar to the preprocessing and matching steps of the Knuth-Morris-Pratt (KMP) string search algorithm.
 *
 * @param {string} haystack - The text in which to search for the pattern.
 * @param {string} needle - The pattern to search for within the text.
 * @returns {number} The length of the longest prefix of the pattern that matches a suffix of the text.
 */
function getPartialMatchLength(haystack, needle) {
  // Calculate the offset if haystack is longer than needle
  let offset = 0;
  if (haystack.length > needle.length) {
    offset = haystack.length - needle.length;
  }

  // Determine the length to use for prefix table (the shorter of the two)
  let prefixTableLength = needle.length;
  if (haystack.length < needle.length) {
    prefixTableLength = haystack.length;
  }

  // Build the prefix table (partial match table) for the needle
  const prefixTable = Array(prefixTableLength);
  let prefixIndex = 0;
  prefixTable[0] = 0;
  for (let i = 1; i < prefixTableLength; i++) {
    // If the current character matches the character at prefixIndex, copy the value
    if (needle[i] === needle[prefixIndex]) {
      prefixTable[i] = prefixTable[prefixIndex];
    } else {
      prefixTable[i] = prefixIndex;
    }
    // Backtrack prefixIndex if mismatch occurs
    while (prefixIndex > 0 && needle[i] !== needle[prefixIndex]) {
      prefixIndex = prefixTable[prefixIndex];
    }
    // If characters match, increment prefixIndex
    if (needle[i] === needle[prefixIndex]) {
      prefixIndex++;
    }
  }

  // Now, scan the haystack for the longest prefix of needle that matches a suffix
  prefixIndex = 0;
  for (let i = offset; i < haystack.length; i++) {
    // Backtrack prefixIndex if mismatch occurs
    while (prefixIndex > 0 && haystack[i] !== needle[prefixIndex]) {
      prefixIndex = prefixTable[prefixIndex];
    }
    // If characters match, increment prefixIndex
    if (haystack[i] === needle[prefixIndex]) {
      prefixIndex++;
    }
  }

  return prefixIndex;
}

module.exports = getPartialMatchLength;