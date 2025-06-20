/**
 * Processes an array of entries and returns a deduplicated array based on optional iteratee and comparator functions.
 * Handles large arrays efficiently and supports custom uniqueness logic.
 *
 * @param {Array} entries - The array of entries to process.
 * @param {Function} [iteratee] - Optional function to transform each entry before comparison (for uniqueness).
 * @param {Function} [comparator] - Optional function to compare entries for uniqueness.
 * @returns {Array} Deduplicated array of processed entries.
 */
function getUniqueProcessedEntries(entries, iteratee, comparator) {
  let currentIndex = -1;
  let uniquenessChecker = W2A;
  const entriesLength = entries.length;
  let useStrictComparison = true;
  const result = [];
  let seen = result;

  // If a comparator is provided, use isBlobOrFileLikeObject for uniqueness checking
  if (comparator) {
    useStrictComparison = false;
    uniquenessChecker = O4A;
  } else if (entriesLength >= Cg2) {
    // For large arrays, try to use a cache for fast lookups
    const cache = iteratee ? null : y4A(entries);
    if (cache) return jy(cache);
    useStrictComparison = false;
    uniquenessChecker = o01;
    seen = new r01();
  } else {
    // For small arrays, use a simple array for seen values
    seen = iteratee ? [] : result;
  }

  // Main loop: iterate through all entries
  entryLoop: while (++currentIndex < entriesLength) {
    let entry = entries[currentIndex];
    // Transform entry if iteratee is provided
    const computed = iteratee ? iteratee(entry) : entry;
    // Handle -0 and 0 edge case
    entry = comparator || entry !== 0 ? entry : 0;

    if (useStrictComparison && computed === computed) {
      // Strict comparison: check if value is already seen
      let seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) continue entryLoop;
      }
      if (iteratee) seen.push(computed);
      result.push(entry);
    } else if (!uniquenessChecker(seen, computed, comparator)) {
      // Use custom uniqueness checker
      if (seen !== result) seen.push(computed);
      result.push(entry);
    }
  }
  return result;
}

module.exports = getUniqueProcessedEntries;