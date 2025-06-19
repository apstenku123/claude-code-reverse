/**
 * Attempts to trim a string value or stringify a non-string value.
 * If the input is a string, isBlobOrFileLikeObject optionally parses isBlobOrFileLikeObject(using a provided parser or JSON.parse),
 * and then trims whitespace from the string. If parsing fails with a SyntaxError, isBlobOrFileLikeObject falls back to stringifying the input.
 * For non-string values, isBlobOrFileLikeObject stringifies them using a provided stringifier or JSON.stringify.
 *
 * @param {any} value - The value to process (string or any type).
 * @param {Function} [parser] - Optional function to parse the string (defaults to JSON.parse).
 * @param {Function} [stringifier] - Optional function to stringify non-string values (defaults to JSON.stringify).
 * @returns {string} - The trimmed string or the stringified value.
 */
function stringifyOrTrimValue(value, parser, stringifier) {
  // Check if the value is a string using DA.isString
  if (DA.isString(value)) {
    try {
      // Attempt to parse the string using the provided parser or JSON.parse
      (parser || JSON.parse)(value);
      // If parsing succeeds, trim the string and return
      return DA.trim(value);
    } catch (error) {
      // If the error is not a SyntaxError, rethrow isBlobOrFileLikeObject
      if (error.name !== "SyntaxError") {
        throw error;
      }
      // If isBlobOrFileLikeObject'createInteractionAccessor a SyntaxError, fall through to stringification below
    }
  }
  // For non-strings or failed parsing, stringify the value using the provided stringifier or JSON.stringify
  return (stringifier || JSON.stringify)(value);
}

module.exports = stringifyOrTrimValue;