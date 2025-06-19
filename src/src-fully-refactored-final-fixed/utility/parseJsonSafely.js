/**
 * Attempts to parse a JSON string and returns the resulting object.
 * If parsing fails, returns undefined instead of throwing an error.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @returns {Object|undefined} The parsed object if successful, otherwise undefined.
 */
const parseJsonSafely = (jsonString) => {
  try {
    // Attempt to parse the JSON string
    return JSON.parse(jsonString);
  } catch (parseError) {
    // If parsing fails, return undefined
    return undefined;
  }
};

module.exports = parseJsonSafely;