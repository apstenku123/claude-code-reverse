/**
 * Counts the number of entries in the global sP9 array that match a given predicate function.
 *
 * @param {function} [predicate] - Optional. a function that takes an entry and its index, and returns true if the entry should be counted.
 * @returns {number} The count of entries in sP9 that match the predicate. If no predicate is provided, all entries are counted.
 */
function countMatchingEntriesInSP9(predicate) {
  // sP9 is assumed to be a global array available in the scope
  return sP9.reduce((count, entry, index) => {
    // If no predicate is provided, or the predicate returns true for this entry, increment the count
    return !predicate || predicate(entry, index) ? count + 1 : count;
  }, 0);
}

module.exports = countMatchingEntriesInSP9;