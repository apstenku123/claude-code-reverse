/**
 * Processes interaction entry arguments and maps them to route names using composeFunctions.
 *
 * @param {...any} interactionEntries - The interaction entries to process. Accepts any number of arguments.
 * @returns {any} The result of processing the interaction entries with composeFunctions.
 */
function processInteractionEntriesToRouteNames(...interactionEntries) {
  // Pass all interaction entries as an array to composeFunctions for further processing
  return composeFunctions(interactionEntries);
}

module.exports = processInteractionEntriesToRouteNames;