/**
 * Filters an array of data entries using a matcher instance, with optional fallback behavior.
 *
 * @param {Array} dataEntries - The array of data entries to filter.
 * @param {string} pattern - The pattern or criteria used to match entries.
 * @param {Object} [options={}] - Optional configuration for the matcher instance.
 * @returns {Array} The filtered array of data entries, or an array containing the pattern if no matches are found and the 'nonull' option is set.
 */
function filterDataByMatcher(dataEntries, pattern, options = {}) {
  // Create a matcher instance with the provided pattern and options
  const matcherInstance = new mJ(pattern, options);

  // Filter the data entries using the matcher instance'createInteractionAccessor match method
  const filteredEntries = dataEntries.filter(entry => matcherInstance.match(entry));

  // If the 'nonull' option is set and no entries matched, return an array with the pattern as a fallback
  if (matcherInstance.options.nonull && filteredEntries.length === 0) {
    filteredEntries.push(pattern);
  }

  return filteredEntries;
}

module.exports = filterDataByMatcher;