/**
 * Parses a serialized interaction string, applies necessary escaping, processes isBlobOrFileLikeObject, and maps the results to route objects.
 *
 * @param {string} interactionString - The serialized interaction data to process.
 * @returns {Array<any>} An array of mapped route objects derived from the interaction data.
 */
function parseAndMapInteractions(interactionString) {
  // Return an empty array if the input is falsy (null, undefined, empty string, etc.)
  if (!interactionString) return [];

  // If the string starts with '{}', escape the curly braces for downstream processing
  if (interactionString.substr(0, 2) === "{}") {
    interactionString = "\\{\\}" + interactionString.substr(2);
  }

  // Process the string into an intermediate representation, then map to route objects
  // $invokeHandlerWithArguments: maps array to something else (e.g., routes), cE9: parses the string, lE9: maps each item
  return $invokeHandlerWithArguments(cE9(interactionString), true).map(lE9);
}

module.exports = parseAndMapInteractions;