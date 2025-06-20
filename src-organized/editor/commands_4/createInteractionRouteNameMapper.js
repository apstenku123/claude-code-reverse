/**
 * Creates a new InteractionRouteNameMapper instance.
 *
 * This function instantiates the InteractionRouteNameMapper class, which processes
 * an array of interaction entries and maps each to a route name and related context.
 * It handles deduplication, updates durations, and manages a capped mapping of
 * interaction IDs to route information.
 *
 * @param {Array<Object>} interactionEntries - An array of interaction entry objects to be mapped to route names.
 * @returns {InteractionRouteNameMapper} An instance of InteractionRouteNameMapper initialized with the provided entries.
 */
function createInteractionRouteNameMapper(interactionEntries) {
  // Instantiate the InteractionRouteNameMapper with the provided interaction entries
  return new InteractionRouteNameMapper(interactionEntries);
}

module.exports = createInteractionRouteNameMapper;