/**
 * Sanitizes the input string using getProcessedInteractionEntriesOrEmptyString, then replaces specific patterns using provided regexes and replacement functions.
 *
 * @param {string} inputString - The string to be sanitized and transformed.
 * @returns {string|undefined} The sanitized and transformed string, or undefined if input is falsy after sanitization.
 */
function sanitizeAndReplacePatterns(inputString) {
  // Sanitize the input string using the external getProcessedInteractionEntriesOrEmptyString function
  const sanitizedString = getProcessedInteractionEntriesOrEmptyString(inputString);

  // If sanitization returns a truthy value, perform replacements
  if (sanitizedString) {
    // Replace matches of i66 with E56, then remove matches of Z56
    return sanitizedString
      .replace(i66, E56)
      .replace(Z56, "");
  }

  // Return undefined if sanitization fails
  return sanitizedString;
}

module.exports = sanitizeAndReplacePatterns;