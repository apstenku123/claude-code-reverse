/**
 * Counts the number of interaction entries in sP9 that match a given predicate.
 *
 * @param {function(interactionEntry: any, index: number): boolean} [predicate] -
 *   Optional. a function to test each interaction entry. Receives the entry and its index.
 *   If omitted, all entries are counted.
 * @returns {number} The count of interaction entries that satisfy the predicate.
 */
function countMatchingInteractionRoutes(predicate) {
  // sP9 is assumed to be an array of interaction entries available in the module scope
  return sP9.reduce((count, interactionEntry, index) => {
    // If no predicate is provided, or the predicate returns true, increment the count
    if (!predicate || predicate(interactionEntry, index)) {
      return count + 1;
    }
    return count;
  }, 0);
}

module.exports = countMatchingInteractionRoutes;