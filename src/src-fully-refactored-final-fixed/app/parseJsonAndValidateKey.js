/**
 * Attempts to parse a JSON string and checks if a specified key exists in the resulting object.
 * Logs an error and returns null if parsing fails or the key is not present.
 *
 * @param {string} jsonString - The JSON string to parse.
 * @param {string} requiredKey - The key to check for existence in the parsed object.
 * @param {string} contextDescription - a description of the context, used in error logging.
 * @returns {object|null} The parsed object if the key exists, otherwise null.
 */
function parseJsonAndValidateKey(jsonString, requiredKey, contextDescription) {
  try {
    // Attempt to parse the JSON string
    const parsedObject = JSON.parse(jsonString);
    // Check if the parsed result is an object and contains the required key
    if (parsedObject && typeof parsedObject === "object" && requiredKey in parsedObject) {
      return parsedObject;
    }
  } catch (error) {
    // Parsing failed; error will be logged below
  }
  // Log an error and return null if parsing failed or key is missing
  mz9.Log.error(`Failed to parse ${contextDescription}`);
  return null;
}

module.exports = parseJsonAndValidateKey;