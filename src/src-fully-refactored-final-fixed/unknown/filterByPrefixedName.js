/**
 * Filters an array of objects, returning only those whose 'name' property starts with a specific prefix.
 * The prefix is constructed as 'mcp__<prefixKey>__'.
 *
 * @param {Array<{name?: string}>} items - The array of objects to filter. Each object may have a 'name' property.
 * @param {string} prefixKey - The key to insert into the prefix pattern.
 * @returns {Array<{name?: string}>} a filtered array containing only objects whose 'name' starts with the constructed prefix.
 */
function filterByPrefixedName(items, prefixKey) {
  // Construct the prefix string to match against the 'name' property
  const namePrefix = `mcp__${prefixKey}__`;

  // Filter items whose 'name' property starts with the constructed prefix
  return items.filter(item => item.name?.startsWith(namePrefix));
}

module.exports = filterByPrefixedName;