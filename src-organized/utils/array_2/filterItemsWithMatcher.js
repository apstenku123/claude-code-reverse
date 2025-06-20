/**
 * Filters an array of items using a matcher instance, with optional fallback behavior.
 *
 * @param {Array} items - The array of items to filter.
 * @param {*} pattern - The pattern or criteria used to create the matcher instance.
 * @param {Object} [options={}] - Optional configuration for the matcher instance.
 * @returns {Array} The filtered array of items. If no items match and the 'nonull' option is set, returns an array containing the pattern.
 */
function filterItemsWithMatcher(items, pattern, options = {}) {
  // Create a matcher instance with the given pattern and options
  const matcher = new mJ(pattern, options);

  // Filter the items array using the matcher'createInteractionAccessor match method
  const filteredItems = items.filter(item => matcher.match(item));

  // If 'nonull' option is set and no items matched, add the pattern to the result
  if (matcher.options.nonull && filteredItems.length === 0) {
    filteredItems.push(pattern);
  }

  return filteredItems;
}

module.exports = filterItemsWithMatcher;