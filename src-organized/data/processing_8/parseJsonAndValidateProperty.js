/**
 * Attempts to parse a JSON string and checks if a specified property exists in the resulting object.
 * Logs an error and returns null if parsing fails or the property is missing.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @param {string} requiredProperty - The property name to check for in the parsed object.
 * @param {string} contextDescription - a description of the context for error logging.
 * @returns {object|null} The parsed object if the property exists, otherwise null.
 */
function parseJsonAndValidateProperty(jsonString, requiredProperty, contextDescription) {
  try {
    // Attempt to parse the input JSON string
    const parsedObject = JSON.parse(jsonString);
    // Check if the parsed result is an object and contains the required property
    if (parsedObject && typeof parsedObject === "object" && requiredProperty in parsedObject) {
      return parsedObject;
    }
  } catch (error) {
    // Parsing failed; error will be logged below
  }
  // Log an error if parsing failed or property is missing, then return null
  mz9.Log.error(`Failed to parse ${contextDescription}`);
  return null;
}

module.exports = parseJsonAndValidateProperty;