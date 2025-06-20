/**
 * Extracts route names from a serialized interaction entries string.
 *
 * This function processes a string representing interaction entries, optionally handling a special case
 * where the string starts with "{}". It parses the entries, processes them, and maps them to route names.
 *
 * @param {string} interactionEntriesString - The serialized interaction entries string to process.
 * @returns {Array<any>} An array of route names mapped from the interaction entries.
 */
function extractRouteNamesFromInteractionEntries(interactionEntriesString) {
  // Return an empty array if the input is falsy (null, undefined, empty string, etc.)
  if (!interactionEntriesString) return [];

  // If the string starts with "{}", prepend escaped braces to preserve structure
  if (interactionEntriesString.substr(0, 2) === "{}") {
    interactionEntriesString = "\\{\\}" + interactionEntriesString.substr(2);
  }

  // Parse the interaction entries string into an array/object structure
  // cE9 is assumed to be a parser function
  const parsedEntries = cE9(interactionEntriesString);

  // $invokeHandlerWithArguments processes the parsed entries, with the second argument (true) possibly indicating a mode or flag
  const processedEntries = $invokeHandlerWithArguments(parsedEntries, true);

  // lE9 maps each processed entry to a route name
  return processedEntries.map(lE9);
}

module.exports = extractRouteNamesFromInteractionEntries;