/**
 * Filters an array of entries using a matcher instance, with optional fallback behavior.
 *
 * @param {Array} entries - The array of entries to be filtered.
 * @param {string} pattern - The pattern or criteria used to create the matcher.
 * @param {Object} [options={}] - Optional configuration for the matcher and filtering behavior.
 * @param {boolean} [options.nonull=false] - If true and no entries match, the pattern is added to the result.
 * @returns {Array} The filtered array of entries, or an array containing the pattern if no matches and nonull is set.
 */
function filterEntriesByMatcher(entries, pattern, options = {}) {
  // Create a matcher instance with the given pattern and options
  const matcher = new mJ(pattern, options);

  // Filter the entries using the matcher'createInteractionAccessor match method
  const filteredEntries = entries.filter(entry => matcher.match(entry));

  // If nonull option is set and no entries matched, include the pattern as a fallback
  if (matcher.options.nonull && filteredEntries.length === 0) {
    filteredEntries.push(pattern);
  }

  return filteredEntries;
}

module.exports = filterEntriesByMatcher;