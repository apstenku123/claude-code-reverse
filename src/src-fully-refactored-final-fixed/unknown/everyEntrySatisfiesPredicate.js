/**
 * Checks if every entry in a collection satisfies a provided predicate function.
 *
 * Iterates over all entries in the given collection using `initializeFromEntries`.
 * For each entry, calls the predicate function. If any entry fails the predicate, iteration stops early and the function returns false.
 *
 * @param {Array|Object} collection - The collection to iterate over (array of entries or object).
 * @param {Function} predicate - The function to test each entry. Receives (value, key, collection).
 * @returns {boolean} True if all entries satisfy the predicate, false otherwise.
 */
function everyEntrySatisfiesPredicate(collection, predicate) {
  let allEntriesValid = true;
  // Use initializeFromEntries to iterate over each entry in the collection
  initializeFromEntries(collection, function (value, key, originalCollection) {
    // Update allEntriesValid based on the predicate result
    allEntriesValid = Boolean(predicate(value, key, originalCollection));
    // If any predicate returns false, stop further iteration
    return allEntriesValid;
  });
  return allEntriesValid;
}

module.exports = everyEntrySatisfiesPredicate;