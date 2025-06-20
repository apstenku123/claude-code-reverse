/**
 * Counts the number of entries in the sP9 array that match a given predicate function.
 *
 * @param {Function} [predicate] - Optional. a function that takes an entry and its index, and returns true if the entry should be counted.
 * @returns {number} The count of entries in sP9 that match the predicate, or the total count if no predicate is provided.
 */
function countMatchingEntries(predicate) {
  // Ensure sP9 is defined and is an array
  if (!Array.isArray(sP9)) {
    throw new Error('sP9 must be an array');
  }

  // Use Array.prototype.reduce to count matching entries
  const matchingCount = sP9.reduce((count, entry, index) => {
    // If no predicate is provided, count all entries
    // Otherwise, count only those for which predicate returns true
    if (!predicate || predicate(entry, index)) {
      return count + 1;
    }
    return count;
  }, 0);

  return matchingCount;
}

module.exports = countMatchingEntries;