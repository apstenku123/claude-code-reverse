/**
 * Formats a group of types using the getSourceString function and joins them with a pipe (|), wrapped in parentheses.
 *
 * @param {...any} types - The types or values to be processed by the getSourceString function.
 * @returns {string} a string representing the group of types, formatted as (Type1|Type2|...).
 */
function formatIsaTypesAsGroup(...types) {
  // Map each type through the getSourceString function and join with a pipe
  const formattedTypes = types.map(type => getSourceString(type)).join('|');
  // Wrap the result in parentheses
  return `(${formattedTypes})`;
}

module.exports = formatIsaTypesAsGroup;