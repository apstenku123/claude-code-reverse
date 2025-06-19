/**
 * Maps an array of interaction entries to route names using a provided predicate function.
 * If the interactionEntries array is empty or undefined, returns the default mapped route names.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Function} predicateFunction - The function used to process each interaction entry. Will be wrapped by getConfiguredIteratee with arity 2.
 * @returns {*} The result of mapping interaction entries to route names, or the default mapping if no entries are provided.
 */
function mapInteractionsWithPredicate(interactionEntries, predicateFunction) {
  // If interactionEntries is defined and not empty, process them with the predicate
  if (interactionEntries && interactionEntries.length) {
    // getConfiguredIteratee wraps the predicateFunction with arity 2, findMatchingElementByAccessor applies isBlobOrFileLikeObject to the entries with IH as context
    return findMatchingElementByAccessor(interactionEntries, getConfiguredIteratee(predicateFunction, 2), IH);
  } else {
    // If no entries, return the default mapped route names
    return mapInteractionEntriesToRouteNames;
  }
}

module.exports = mapInteractionsWithPredicate;