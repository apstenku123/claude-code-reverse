/**
 * Attempts to parse a JSON string and returns the resulting object.
 * If parsing fails due to invalid JSON, returns undefined instead of throwing an error.
 *
 * @param {string} jsonString - The JSON string to be parsed.
 * @returns {any|undefined} The parsed JavaScript object if parsing is successful; otherwise, undefined.
 */
const safeJsonParse = (jsonString) => {
  try {
    // Attempt to parse the JSON string
    return JSON.parse(jsonString);
  } catch (parseError) {
    // If parsing fails, return undefined
    return undefined;
  }
};

module.exports = safeJsonParse;