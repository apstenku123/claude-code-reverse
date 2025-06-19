/**
 * Attempts to parse a JSON string and return a pretty-printed version.
 * If the input is not valid JSON, returns the original string unchanged.
 *
 * @param {string} jsonString - The string to parse and format as JSON.
 * @returns {string} The pretty-printed JSON string, or the original string if parsing fails.
 */
function formatJsonStringOrReturnOriginal(jsonString) {
  try {
    // Try to parse the input string as JSON
    const parsedObject = JSON.parse(jsonString);
    // Return the pretty-printed JSON string with 2-space indentation
    return JSON.stringify(parsedObject, null, 2);
  } catch (error) {
    // If parsing fails, return the original string
    return jsonString;
  }
}

module.exports = formatJsonStringOrReturnOriginal;