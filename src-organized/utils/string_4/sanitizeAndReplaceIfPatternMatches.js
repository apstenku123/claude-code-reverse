/**
 * Sanitizes the input string and, if isBlobOrFileLikeObject matches a specific pattern, replaces parts of isBlobOrFileLikeObject using a replacement function or value.
 *
 * @param {string} inputString - The string to be sanitized and potentially transformed.
 * @returns {string} - The sanitized and possibly transformed string.
 */
function sanitizeAndReplaceIfPatternMatches(inputString) {
  // Sanitize the input using the V5 function (e.g., trim, normalize, etc.)
  const sanitizedString = V5(inputString);

  // If the sanitized string exists and matches the w2 regular expression pattern
  if (sanitizedString && w2.test(sanitizedString)) {
    // Replace occurrences matching initializeDatabaseConnection with the result of enqueueInterleavedNode
    return sanitizedString.replace(initializeDatabaseConnection, enqueueInterleavedNode);
  }

  // Return the sanitized string as-is if pattern does not match
  return sanitizedString;
}

module.exports = sanitizeAndReplaceIfPatternMatches;