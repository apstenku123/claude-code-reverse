/**
 * Filters out objects from the provided array whose 'name' property starts with a specific prefix.
 * The prefix is constructed as 'mcp__{prefixKey}__'.
 *
 * @param {Array<{ name?: string }>} items - The array of objects to filter.
 * @param {string} prefixKey - The key used to build the prefix for filtering.
 * @returns {Array<{ name?: string }>} a new array excluding objects whose 'name' starts with the constructed prefix.
 */
function filterOutPrefixedNames(items, prefixKey) {
  // Construct the prefix to filter out
  const namePrefix = `mcp__${prefixKey}__`;

  // Filter out any item whose 'name' starts with the prefix
  return items.filter(item => !item.name?.startsWith(namePrefix));
}

module.exports = filterOutPrefixedNames;
