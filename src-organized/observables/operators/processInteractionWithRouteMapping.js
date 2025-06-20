/**
 * Processes user interactions by mapping them to routes using the provided mapping function.
 * The function adapts its call signature based on the arity of the mapping function.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps interactions to routes. Accepts either (subscription, mappedInteraction) or(subscription, config, mappedInteraction).
 * @param {Object} config - Configuration object for mapping interactions (optional, depending on mapping function arity).
 * @param {Object} subscription - The subscription or context for the mapping operation.
 * @param {any} interaction - The user interaction data to be mapped.
 * @returns {any} The result of the mapping operation, as returned by mapInteractionsToRoutes.
 */
function processInteractionWithRouteMapping(mapInteractionsToRoutes, config, subscription, interaction) {
  // Map the interaction using the external sWA function
  const mappedInteraction = sWA(interaction);

  // Determine the arity of the mapping function and call accordingly
  let mappingResult;
  if (mapInteractionsToRoutes.length === 2) {
    // If the mapping function expects 2 arguments, pass subscription and mappedInteraction
    mappingResult = mapInteractionsToRoutes(subscription, mappedInteraction);
  } else {
    // Otherwise, pass subscription, config, and mappedInteraction
    mappingResult = mapInteractionsToRoutes(subscription, config, mappedInteraction);
  }

  return mappingResult;
}

module.exports = processInteractionWithRouteMapping;