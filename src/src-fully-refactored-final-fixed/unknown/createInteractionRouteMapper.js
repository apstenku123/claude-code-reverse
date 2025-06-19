/**
 * Creates a new instance of the InteractionRouteMapper, which processes an array of user interaction entries
 * and maps each to a route name while storing relevant metadata.
 *
 * @param {Array<Object>} interactionEntries - An array of user interaction entries to be mapped to routes.
 * @returns {InteractionRouteMapper} An instance that handles mapping interactions to routes and manages their metadata.
 */
function createInteractionRouteMapper(interactionEntries) {
  // The 'na' constructor is assumed to be the InteractionRouteMapper class or function
  // that encapsulates the logic for mapping interactions to routes.
  return new na(interactionEntries);
}

module.exports = createInteractionRouteMapper;