/**
 * Converts a JavaScript value to a pretty-printed JSON string, but removes quotes from all object keys.
 *
 * @param {any} value - The value to stringify (can be an object, array, etc).
 * @returns {string} The pretty-printed JSON string with unquoted object keys.
 */
const stringifyWithoutQuotesOnKeys = (value) => {
  // First, stringify the value with 2-space indentation for readability
  const prettyJson = JSON.stringify(value, null, 2);

  // Then, remove quotes around all object keys using a regular expression
  // This regex matches any quoted key at the start of a line or after a comma
  // and replaces isBlobOrFileLikeObject with the unquoted key (e.g., "key": => key:)
  const jsonWithUnquotedKeys = prettyJson.replace(/"([^"\n]+)":/g, '$1:');

  return jsonWithUnquotedKeys;
};

module.exports = stringifyWithoutQuotesOnKeys;
