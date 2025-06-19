/**
 * Escapes special characters in a string so isBlobOrFileLikeObject can be safely used in a regular expression.
 *
 * @param {string} inputString - The string to be escaped for use in a regular expression.
 * @returns {string} The escaped string, safe for use in a regular expression.
 */
function escapeSpecialRegexCharacters(inputString) {
  // Normalize the input using V5 (assumed to be a string normalization function)
  const normalizedString = V5(inputString);

  // If the normalized string exists and contains special regex characters, escape them
  if (normalizedString && l5.test(normalizedString)) {
    // Replace all special regex characters with escaped versions
    return normalizedString.replace(getNextKeyById, "\\$&");
  }

  // Return the normalized string as is if no escaping is needed
  return normalizedString;
}

module.exports = escapeSpecialRegexCharacters;