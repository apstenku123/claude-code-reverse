/**
 * Checks if any element in the entries array satisfies the provided predicate function.
 *
 * @param {Array} entries - The array of entries to check.
 * @param {*} target - The target value or object to compare against each entry.
 * @param {Function} predicate - a function that takes (target, entry) and returns a boolean indicating a match.
 * @returns {boolean} Returns true if any entry matches the predicate; otherwise, false.
 */
function doesAnyEntryMatchPredicate(entries, target, predicate) {
  // If entries is null or undefined, treat as empty array
  const entriesLength = entries == null ? 0 : entries.length;

  // Iterate over each entry in the array
  for (let index = 0; index < entriesLength; index++) {
    // If the predicate returns true for the current entry, return true immediately
    if (predicate(target, entries[index])) {
      return true;
    }
  }
  // If no entries matched the predicate, return false
  return false;
}

module.exports = doesAnyEntryMatchPredicate;