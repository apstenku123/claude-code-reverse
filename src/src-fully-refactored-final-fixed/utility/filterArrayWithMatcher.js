/**
 * Filters an array of items using a matcher instance, with optional fallback behavior.
 *
 * @param {Array} items - The array of items to be filtered.
 * @param {string} pattern - The pattern or criteria used by the matcher to filter items.
 * @param {Object} [options={}] - Optional configuration for the matcher and filtering behavior.
 * @param {boolean} [options.nonull=false] - If true and no items match, the pattern will be added to the result.
 * @returns {Array} The filtered array of items, possibly including the pattern if no matches and nonull is set.
 */
function filterArrayWithMatcher(items, pattern, options = {}) {
  // Create a matcher instance with the provided pattern and options
  const matcher = new mJ(pattern, options);

  // Filter the items using the matcher'createInteractionAccessor match method
  const filteredItems = items.filter(item => matcher.match(item));

  // If nonull option is set and no items matched, add the pattern to the result
  if (matcher.options.nonull && filteredItems.length === 0) {
    filteredItems.push(pattern);
  }

  return filteredItems;
}

module.exports = filterArrayWithMatcher;