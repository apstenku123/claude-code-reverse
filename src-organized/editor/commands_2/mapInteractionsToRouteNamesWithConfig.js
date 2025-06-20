/**
 * Maps interaction entries to route names, optionally using a configuration object.
 *
 * If the mapping function (mapInteractionEntriesToRouteNames) expects only two arguments,
 * isBlobOrFileLikeObject is called with (subscription, sWA(interactionId)). Otherwise, isBlobOrFileLikeObject is called with
 * (subscription, config, sWA(interactionId)).
 *
 * @param {Function} mapInteractionEntriesToRouteNames - Function that maps interaction entries to route names.
 * @param {Object} config - Optional configuration object for mapping.
 * @param {any} subscription - The subscription or context to be passed to the mapping function.
 * @param {any} interactionId - The interaction updateSnapshotAndNotify to be processed by sWA.
 * @returns {any} The result of the mapping function.
 */
function mapInteractionsToRouteNamesWithConfig(
  mapInteractionEntriesToRouteNames,
  config,
  subscription,
  interactionId
) {
  // Determine the number of expected arguments for the mapping function
  let routeMappingResult;
  if (mapInteractionEntriesToRouteNames.length === 2) {
    // If only two arguments are expected, call with (subscription, sWA(interactionId))
    routeMappingResult = mapInteractionEntriesToRouteNames(
      subscription,
      sWA(interactionId)
    );
  } else {
    // Otherwise, call with (subscription, config, sWA(interactionId))
    routeMappingResult = mapInteractionEntriesToRouteNames(
      subscription,
      config,
      sWA(interactionId)
    );
  }
  return routeMappingResult;
}

module.exports = mapInteractionsToRouteNamesWithConfig;