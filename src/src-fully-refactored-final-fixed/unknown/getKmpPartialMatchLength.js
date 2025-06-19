/**
 * Calculates the length of the longest prefix of the pattern (needle) that matches a suffix of the text (haystack),
 * using the Knuth-Morris-Pratt (KMP) partial match table algorithm.
 *
 * @param {string} haystack - The text in which to search for the pattern.
 * @param {string} needle - The pattern to search for within the text.
 * @returns {number} The length of the longest prefix of the pattern that matches a suffix of the text.
 */
function getKmpPartialMatchLength(haystack, needle) {
  // Determine the offset if haystack is longer than needle
  let haystackOffset = 0;
  if (haystack.length > needle.length) {
    haystackOffset = haystack.length - needle.length;
  }

  // Determine the length to use for the partial match table
  let partialMatchLength = needle.length;
  if (haystack.length < needle.length) {
    partialMatchLength = haystack.length;
  }

  // Build the partial match table (failure function) for the pattern (needle)
  const partialMatchTable = Array(partialMatchLength);
  let prefixLength = 0;
  partialMatchTable[0] = 0;
  for (let i = 1; i < partialMatchLength; i++) {
    // If current character matches the character at prefixLength, inherit the value
    if (needle[i] === needle[prefixLength]) {
      partialMatchTable[i] = partialMatchTable[prefixLength];
    } else {
      partialMatchTable[i] = prefixLength;
    }
    // Backtrack prefixLength if mismatch occurs
    while (prefixLength > 0 && needle[i] !== needle[prefixLength]) {
      prefixLength = partialMatchTable[prefixLength];
    }
    // If current character matches, increment prefixLength
    if (needle[i] === needle[prefixLength]) {
      prefixLength++;
    }
  }

  // Now, scan the haystack for the longest prefix of needle matching a suffix of haystack
  prefixLength = 0;
  for (let i = haystackOffset; i < haystack.length; i++) {
    while (prefixLength > 0 && haystack[i] !== needle[prefixLength]) {
      prefixLength = partialMatchTable[prefixLength];
    }
    if (haystack[i] === needle[prefixLength]) {
      prefixLength++;
    }
  }

  return prefixLength;
}

module.exports = getKmpPartialMatchLength;