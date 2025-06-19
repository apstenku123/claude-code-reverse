/**
 * Parses a serialized string of interaction entries, applies necessary transformations,
 * and returns an array of processed interaction entry objects.
 *
 * @param {string} serializedEntries - The serialized string representing interaction entries.
 * @returns {Array<any>} An array of processed interaction entry objects.
 */
function parseInteractionEntries(serializedEntries) {
  // If the input is falsy (null, undefined, empty string, etc.), return an empty array
  if (!serializedEntries) return [];

  // If the string starts with "{}", escape the curly braces to avoid parsing issues
  if (serializedEntries.substr(0, 2) === "{}") {
    serializedEntries = "\\{\\}" + serializedEntries.substr(2);
  }

  // Parse the serialized entries, process them, and map each entry to its final form
  // cE9: parses the string into entries
  // $invokeHandlerWithArguments: processes the parsed entries (second argument true likely enables a specific mode)
  // lE9: maps each processed entry to its final representation
  return $invokeHandlerWithArguments(cE9(serializedEntries), true).map(lE9);
}

module.exports = parseInteractionEntries;