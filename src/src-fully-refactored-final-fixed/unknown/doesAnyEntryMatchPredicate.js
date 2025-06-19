/**
 * Checks if any entry in the provided entries array satisfies the given predicate function.
 *
 * @param {Array} entriesWrapper - An array where the second element (index 1) is an array of entries to check. Each entry is expected to be an array where the first element has a 'type' property.
 * @param {Function} predicate - a function that takes an entry and its type, and returns true if the entry matches the desired condition.
 * @returns {boolean} True if any entry satisfies the predicate, otherwise false.
 */
function doesAnyEntryMatchPredicate(entriesWrapper, predicate) {
  // Extract the entries array from the wrapper (assumed to be at index 1)
  const entries = entriesWrapper[1];

  for (const entry of entries) {
    // Each entry is assumed to be an array where the first element is an object with a 'type' property
    const entryType = entry[0].type;
    // If the predicate returns true for this entry, return true immediately
    if (predicate(entry, entryType)) {
      return true;
    }
  }
  // If no entry matched the predicate, return false
  return false;
}

module.exports = doesAnyEntryMatchPredicate;