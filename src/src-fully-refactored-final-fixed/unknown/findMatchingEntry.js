/**
 * Searches through an array of entries and returns the first entry that matches the given criteria.
 *
 * @param {Array<any>} entries - The array of entries to search through.
 * @param {any} criteria - The criteria to match against each entry.
 * @param {any} context - Additional context or options for the matching function.
 * @returns {any|undefined} The first entry that matches the criteria, or undefined if none found.
 */
function findMatchingEntry(entries, criteria, context) {
  for (let index = 0; index < entries.length; index++) {
    const entry = entries[index];
    // Check if the current entry matches the criteria using the external matching function
    if (matchesNodeNameFilter(entry, criteria, context)) {
      return entry;
    }
  }
  // Return undefined if no matching entry is found
  return undefined;
}

module.exports = findMatchingEntry;