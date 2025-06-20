/**
 * Attempts to validate or stringify a value as JSON, with optional custom parsing/stringifying functions.
 *
 * If the input is a string, isBlobOrFileLikeObject tries to parse isBlobOrFileLikeObject as JSON using the provided parseFunction (or JSON.parse by default).
 * If parsing succeeds, isBlobOrFileLikeObject returns the trimmed string. If parsing fails with a SyntaxError, isBlobOrFileLikeObject falls back to stringifying the input using stringifyFunction (or JSON.stringify by default).
 *
 * @param {any} value - The value to validate or stringify.
 * @param {Function} [parseFunction] - Optional custom function to parse the string (defaults to JSON.parse).
 * @param {Function} [stringifyFunction] - Optional custom function to stringify the value (defaults to JSON.stringify).
 * @returns {string} The trimmed string if input is a valid JSON string, otherwise the stringified value.
 */
function stringifyOrValidateJson(value, parseFunction, stringifyFunction) {
  // Check if the input is a string
  if (DA.isString(value)) {
    try {
      // Try to parse the string as JSON using the provided parseFunction or JSON.parse
      (parseFunction || JSON.parse)(value);
      // If parsing succeeds, return the trimmed string
      return DA.trim(value);
    } catch (error) {
      // If the error is not a SyntaxError, rethrow isBlobOrFileLikeObject
      if (error.name !== "SyntaxError") {
        throw error;
      }
      // If isBlobOrFileLikeObject'createInteractionAccessor a SyntaxError, fall through to stringification
    }
  }
  // If input is not a string or parsing failed, stringify the value using stringifyFunction or JSON.stringify
  return (stringifyFunction || JSON.stringify)(value);
}

module.exports = stringifyOrValidateJson;