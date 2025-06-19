/**
 * Counts the number of entries in the sP9 array that match a given predicate function.
 *
 * @param {function} predicate - a function that takes an entry and its index, and returns true if the entry should be counted.
 * @returns {number} The count of entries in sP9 for which the predicate returns true.
 */
function countMatchingInteractions(predicate) {
  // Use Array.prototype.reduce to count entries matching the predicate
  return sP9.reduce((count, entry, index) => {
    // If no predicate is provided, count all entries
    // Otherwise, count only those for which predicate returns true
    return !predicate || predicate(entry, index) ? count + 1 : count;
  }, 0);
}

module.exports = countMatchingInteractions;