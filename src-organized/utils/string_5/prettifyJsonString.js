/**
 * Attempts to parse a JSON string and return a pretty-printed version.
 * If the input is not valid JSON, returns the original string unchanged.
 *
 * @param {string} jsonString - The string to parse and pretty-print.
 * @returns {string} The pretty-printed JSON string, or the original string if parsing fails.
 */
function prettifyJsonString(jsonString) {
  try {
    // Parse the input string as JSON
    const parsedObject = JSON.parse(jsonString);
    // Stringify the object with 2-space indentation for readability
    return JSON.stringify(parsedObject, null, 2);
  } catch {
    // If parsing fails, return the original string
    return jsonString;
  }
}

module.exports = prettifyJsonString;