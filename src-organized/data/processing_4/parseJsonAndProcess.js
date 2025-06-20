/**
 * Parses a JSON string and processes the resulting object using mapObjectValuesToN3Defaults.
 *
 * @param {string} jsonString - The JSON string to be parsed and processed.
 * @returns {any} The result of processing the parsed object with mapObjectValuesToN3Defaults.
 */
function parseJsonAndProcess(jsonString) {
  // Parse the input JSON string into a JavaScript object
  const parsedObject = JSON.parse(jsonString);
  // Process the parsed object using the mapObjectValuesToN3Defaults function
  return mapObjectValuesToN3Defaults(parsedObject);
}

module.exports = parseJsonAndProcess;