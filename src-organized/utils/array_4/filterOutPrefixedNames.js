/**
 * Filters out objects from the provided array whose 'name' property starts with a specific prefix.
 * The prefix is constructed as 'mcp__<prefixValue>__'.
 *
 * @param {Array<{name?: string}>} items - The array of objects to filter.
 * @param {string} prefixValue - The value to insert into the prefix pattern.
 * @returns {Array<{name?: string}>} a new array excluding objects whose 'name' starts with the constructed prefix.
 */
function filterOutPrefixedNames(items, prefixValue) {
  // Construct the prefix to filter out (e.g., 'mcp__example__')
  const namePrefix = `mcp__${prefixValue}__`;

  // Filter out any item whose 'name' property starts with the constructed prefix
  return items.filter(item => !item.name?.startsWith(namePrefix));
}

module.exports = filterOutPrefixedNames;
