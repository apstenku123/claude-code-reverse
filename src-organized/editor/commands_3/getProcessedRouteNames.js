/**
 * Processes interaction entries and maps them to route names, applying specific logic based on type and optional key.
 *
 * @param {any} interactionEntries - The entries representing user interactions to be processed.
 * @param {any} routeMapping - The mapping or context used for route name resolution.
 * @param {any} interactionKey - Optional key used to determine if a special mapping should be applied.
 * @returns {any} The result of mapping interaction entries to route names, possibly transformed by a specific processor.
 */
function getProcessedRouteNames(interactionEntries, routeMapping, interactionKey) {
  // Determine which processor to use based on the type of interactionEntries
  const processor = isInteractionEntriesArray(interactionEntries) ? interactionEntriesProcessor : defaultProcessor;

  // If a key is provided and the interaction is valid, map to the canonical observable
  if (interactionKey && isValidInteraction(interactionEntries, routeMapping, interactionKey)) {
    routeMapping = mapInteractionEntriesToRouteNames;
  }

  // Process the entries with the selected processor and a normalized mapping
  return processor(interactionEntries, normalizeRouteMapping(routeMapping, 3));
}

module.exports = getProcessedRouteNames;
