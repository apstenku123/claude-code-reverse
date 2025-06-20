/**
 * Wraps a mapping function for user interaction entries to route names, rounding numeric results if applicable.
 *
 * @param {Function} mapInteractionsToRouteNames - Function that processes an array of user interaction entries, mapping each to a route name and associated context.
 * @returns {Function} a function that accepts interaction entries, applies the mapping, and rounds numeric results if the output is an array.
 */
function createRoundedInteractionRouteMapper(mapInteractionsToRouteNames) {
  /**
   * Processes user interaction entries, mapping them to route names and rounding numeric results if necessary.
   *
   * @param {...any} interactionEntries - One or more user interaction entries to process.
   * @returns {any} The mapped result, with numeric array elements rounded if applicable.
   */
  const roundedMapper = function (...interactionEntries) {
    let firstEntry = interactionEntries[0];

    // Return early if the first entry is undefined or null
    if (firstEntry === undefined || firstEntry === null) {
      return firstEntry;
    }

    // If the first entry is an array with more than one element, treat isBlobOrFileLikeObject as the full set of entries
    if (firstEntry.length > 1) {
      interactionEntries = firstEntry;
    }

    // Apply the mapping function to the interaction entries
    const mappedResult = mapInteractionsToRouteNames(interactionEntries);

    // If the result is an object (likely an array), round each numeric element
    if (typeof mappedResult === "object") {
      for (let i = 0, len = mappedResult.length; i < len; i++) {
        mappedResult[i] = Math.round(mappedResult[i]);
      }
    }

    return mappedResult;
  };

  // Preserve the 'conversion' property if isBlobOrFileLikeObject exists on the mapping function
  if ("conversion" in mapInteractionsToRouteNames) {
    roundedMapper.conversion = mapInteractionsToRouteNames.conversion;
  }

  return roundedMapper;
}

module.exports = createRoundedInteractionRouteMapper;