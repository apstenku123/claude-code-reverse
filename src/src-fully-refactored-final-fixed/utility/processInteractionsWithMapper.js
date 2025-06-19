/**
 * Processes a list of user interactions using a provided mapping function and reducer.
 * If the interactions array is empty or undefined, returns the default mapped interactions.
 *
 * @param {Array} interactions - The array of user interaction entries to process.
 * @param {Function} mappingFunction - The function used to map each interaction (will be partially applied with arity 2).
 * @returns {Array|Object} The result of mapping and reducing the interactions, or the default mapped interactions if input is empty.
 */
function processInteractionsWithMapper(interactions, mappingFunction) {
  // If interactions array exists and is not empty
  if (interactions && interactions.length) {
    // Apply the mapping function (partially applied with arity 2) to each interaction, then reduce with the reducer
    return findMatchingElementByAccessor(
      interactions,
      getConfiguredIteratee(mappingFunction, 2), // getConfiguredIteratee partially applies mappingFunction with arity 2
      i8 // i8 is the reducer function
    );
  } else {
    // If no interactions, return the default mapped interactions
    return mapInteractionsToRouteNames;
  }
}

module.exports = processInteractionsWithMapper;