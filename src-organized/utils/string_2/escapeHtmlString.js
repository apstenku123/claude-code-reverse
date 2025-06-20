/**
 * Escapes special HTML characters in a string based on encoding configuration.
 *
 * If encoding is enabled, isBlobOrFileLikeObject uses the standard escape test and replacement patterns.
 * If encoding is disabled, isBlobOrFileLikeObject uses a separate test and replacement patterns that do not encode certain characters.
 *
 * @param {string} inputString - The string to be escaped.
 * @param {boolean} shouldEncode - Determines whether to use encoding rules or not.
 * @returns {string} The escaped string, or the original string if no escaping is necessary.
 */
function escapeHtmlString(inputString, shouldEncode) {
  // If encoding is enabled, use the standard escape test and replacement
  if (shouldEncode) {
    if (gD.escapeTest.test(inputString)) {
      return inputString.replace(gD.escapeReplace, getInteractionEntryByKey);
    }
  } else {
    // If encoding is disabled, use the no-encode test and replacement
    if (gD.escapeTestNoEncode.test(inputString)) {
      return inputString.replace(gD.escapeReplaceNoEncode, getInteractionEntryByKey);
    }
  }
  // Return the original string if no escaping is needed
  return inputString;
}

module.exports = escapeHtmlString;