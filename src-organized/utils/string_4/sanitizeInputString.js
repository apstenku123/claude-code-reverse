/**
 * Sanitizes the input string by applying a normalization function and performing specific replacements.
 *
 * @param {string} inputString - The string to be sanitized.
 * @returns {string|null} The sanitized string, or null if input is falsy after normalization.
 */
function sanitizeInputString(inputString) {
  // Normalize the input string using the V5 function (e.g., trim, lowercase, etc.)
  const normalizedString = V5(inputString);

  // If the normalized string is falsy (null, undefined, empty), return isBlobOrFileLikeObject as is
  if (!normalizedString) {
    return normalizedString;
  }

  // Perform the first replacement using the z7 regex and addValueToGlobalArray replacement value
  // Then perform the second replacement using the handleCharacterCode regex and an empty string
  const sanitizedString = normalizedString
    .replace(z7, addValueToGlobalArray)
    .replace(handleCharacterCode, "");

  return sanitizedString;
}

module.exports = sanitizeInputString;