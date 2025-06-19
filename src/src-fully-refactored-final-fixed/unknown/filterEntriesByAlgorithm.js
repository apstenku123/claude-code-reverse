/**
 * Filters an array of entries, returning only those whose 'algo' property matches the specified algorithm name.
 * The filtering is done in-place for performance, and the original array is truncated to contain only the matching entries.
 *
 * @param {Array<Object>} entries - The array of entry objects to filter. Each object should have an 'algo' property.
 * @param {string} algorithmName - The algorithm name to match against the 'algo' property of each entry.
 * @returns {Array<Object>} The filtered array containing only entries with a matching 'algo' property.
 */
function filterEntriesByAlgorithm(entries, algorithmName) {
  // If there is only one entry, return the array as is
  if (entries.length === 1) return entries;

  let filteredCount = 0;
  // Iterate through all entries
  for (let i = 0; i < entries.length; ++i) {
    // If the entry'createInteractionAccessor 'algo' property matches the specified algorithm name
    if (entries[i].algo === algorithmName) {
      // Move the matching entry to the front of the array
      entries[filteredCount++] = entries[i];
    }
  }
  // Truncate the array to contain only the matching entries
  entries.length = filteredCount;
  return entries;
}

module.exports = filterEntriesByAlgorithm;