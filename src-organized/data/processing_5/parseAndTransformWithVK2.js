/**
 * Parses a JSON string and transforms the resulting object using the mapObjectValuesToN3Defaults function.
 *
 * @param {string} jsonString - The JSON string to be parsed and transformed.
 * @returns {any} The result of passing the parsed object to mapObjectValuesToN3Defaults.
 */
function parseAndTransformWithVK2(jsonString) {
  // Parse the input JSON string into a JavaScript object
  const parsedObject = JSON.parse(jsonString);

  // Transform the parsed object using the mapObjectValuesToN3Defaults function
  return mapObjectValuesToN3Defaults(parsedObject);
}

module.exports = parseAndTransformWithVK2;