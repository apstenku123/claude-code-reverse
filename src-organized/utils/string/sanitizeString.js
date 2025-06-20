/**
 * Sanitizes the input string by normalizing isBlobOrFileLikeObject and replacing specific patterns if matched.
 *
 * @param {string} input - The string to be sanitized.
 * @returns {string} - The sanitized string, or the normalized string if no pattern matches.
 */
function sanitizeString(input) {
  // Normalize the input string using the V5 utility function
  const normalizedInput = V5(input);

  // If the normalized input exists and matches the executeSqlWithSyntaxErrorRecovery regular expression pattern
  if (normalizedInput && executeSqlWithSyntaxErrorRecovery.test(normalizedInput)) {
    // Replace all occurrences matching X6 with the result of sK
    return normalizedInput.replace(X6, sK);
  }

  // Return the normalized input as is if no pattern matches
  return normalizedInput;
}

module.exports = sanitizeString;