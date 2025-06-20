/**
 * Filters an array of items using a matcher instance, with optional fallback behavior.
 *
 * @param {Array} items - The array of items to be filtered.
 * @param {string} pattern - The pattern or value to match against each item.
 * @param {Object} [options={}] - Optional configuration for the matcher instance.
 * @returns {Array} The filtered array, or an array containing the pattern if no matches and nonull is set.
 */
function filterWithMatcherOrFallback(items, pattern, options = {}) {
  // Create a matcher instance with the given pattern and options
  const matcherInstance = new mJ(pattern, options);

  // Filter items using the matcher instance'createInteractionAccessor match method
  let filteredItems = items.filter(item => matcherInstance.match(item));

  // If 'nonull' option is set and no items matched, add the pattern as a fallback
  if (matcherInstance.options.nonull && filteredItems.length === 0) {
    filteredItems.push(pattern);
  }

  return filteredItems;
}

module.exports = filterWithMatcherOrFallback;