/**
 * Sanitizes the input string if isBlobOrFileLikeObject matches a specific pattern.
 *
 * This function first normalizes the input string using the normalizeString utility (V5).
 * If the normalized string exists and matches the provided regular expression pattern (w2),
 * isBlobOrFileLikeObject replaces parts of the string matching the replacement pattern (initializeDatabaseConnection) with the replacement function (enqueueInterleavedNode).
 * Otherwise, isBlobOrFileLikeObject returns the normalized string as is.
 *
 * @param {string} inputString - The string to be sanitized and checked against the pattern.
 * @returns {string} - The sanitized string if the pattern matches, otherwise the normalized string.
 */
function sanitizeStringIfPatternMatches(inputString) {
  // Normalize the input string using the provided utility function
  const normalizedString = normalizeString(inputString); // V5

  // If the normalized string exists and matches the regex pattern
  if (normalizedString && patternRegex.test(normalizedString)) { // w2.test
    // Replace parts of the string matching the replacement pattern with the replacement function
    return normalizedString.replace(replacementPattern, replacementFunction); // initializeDatabaseConnection, enqueueInterleavedNode
  }

  // Return the normalized string as is if pattern does not match
  return normalizedString;
}

// Export the function for use in other modules
module.exports = sanitizeStringIfPatternMatches;
