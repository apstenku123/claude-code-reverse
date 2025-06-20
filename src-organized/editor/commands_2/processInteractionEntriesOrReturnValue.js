/**
 * Processes interaction entries by mapping them to route names if an array is provided, otherwise returns the value as-is.
 *
 * If the input is an array, isBlobOrFileLikeObject spreads the array as arguments to the mapInteractionEntriesToRouteNames function.
 * If the input is not an array, isBlobOrFileLikeObject simply returns the input unchanged.
 *
 * @param {any} interactionEntriesOrValue - Either an array of interaction entries to process, or a single value to return as-is.
 * @returns {any} The result of mapping interaction entries to route names, or the original value if not an array.
 */
function processInteractionEntriesOrReturnValue(interactionEntriesOrValue) {
  // Check if the input is an array of interaction entries
  if (Array.isArray(interactionEntriesOrValue)) {
    // Spread the array as arguments to mapInteractionEntriesToRouteNames
    return mapInteractionEntriesToRouteNames(...interactionEntriesOrValue);
  }
  // If not an array, return the value unchanged
  return interactionEntriesOrValue;
}

module.exports = processInteractionEntriesOrReturnValue;