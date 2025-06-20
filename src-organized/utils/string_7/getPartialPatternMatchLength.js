/**
 * Determines the length of the longest prefix of the pattern (needle) that matches a suffix of the text (haystack).
 * This is similar to the prefix function in the Knuth-Morris-Pratt (KMP) string matching algorithm.
 *
 * @param {string} text - The text (haystack) to search within.
 * @param {string} pattern - The pattern (needle) to match against the text.
 * @returns {number} The length of the longest prefix of the pattern that matches a suffix of the text.
 */
function getPartialPatternMatchLength(text, pattern) {
  // If text is longer than pattern, start matching from the difference
  let startIndex = 0;
  if (text.length > pattern.length) {
    startIndex = text.length - pattern.length;
  }

  // The length to use for prefix table and matching
  let matchLength = pattern.length;
  if (text.length < pattern.length) {
    matchLength = text.length;
  }

  // Build the prefix table (failure function) for the pattern
  const prefixTable = Array(matchLength);
  let prefixIndex = 0;
  prefixTable[0] = 0;
  for (let i = 1; i < matchLength; i++) {
    // If current character matches the character at prefixIndex, inherit the prefix length
    if (pattern[i] === pattern[prefixIndex]) {
      prefixTable[i] = prefixTable[prefixIndex];
    } else {
      prefixTable[i] = prefixIndex;
    }
    // Backtrack prefixIndex if mismatch
    while (prefixIndex > 0 && pattern[i] !== pattern[prefixIndex]) {
      prefixIndex = prefixTable[prefixIndex];
    }
    // If match, increment prefixIndex
    if (pattern[i] === pattern[prefixIndex]) {
      prefixIndex++;
    }
  }

  // Now, scan the text from startIndex, using the prefix table to track matches
  prefixIndex = 0;
  for (let i = startIndex; i < text.length; i++) {
    // Backtrack prefixIndex if mismatch
    while (prefixIndex > 0 && text[i] !== pattern[prefixIndex]) {
      prefixIndex = prefixTable[prefixIndex];
    }
    // If match, increment prefixIndex
    if (text[i] === pattern[prefixIndex]) {
      prefixIndex++;
    }
  }

  // prefixIndex now holds the length of the longest prefix of pattern matching a suffix of text
  return prefixIndex;
}

module.exports = getPartialPatternMatchLength;