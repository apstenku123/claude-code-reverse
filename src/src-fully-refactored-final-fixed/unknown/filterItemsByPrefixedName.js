/**
 * Filters an array of items, returning only those whose 'name' property starts with a specific prefix.
 * The prefix is constructed as 'mcp__{prefixKey}__'.
 *
 * @param {Array<{name?: string}>} items - The array of items to filter. Each item should have a 'name' property.
 * @param {string} prefixKey - The key to include in the prefix for filtering.
 * @returns {Array<{name?: string}>} - An array containing only the items whose 'name' starts with the constructed prefix.
 */
function filterItemsByPrefixedName(items, prefixKey) {
  // Construct the prefix to match against the 'name' property
  const namePrefix = `mcp__${prefixKey}__`;

  // Filter items whose 'name' property starts with the constructed prefix
  return items.filter(item => item.name?.startsWith(namePrefix));
}

module.exports = filterItemsByPrefixedName;