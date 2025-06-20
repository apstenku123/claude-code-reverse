/**
 * Formats the getSourceString types of the provided values as a union type string.
 *
 * @param {...any} values - The values whose getSourceString types will be determined and formatted.
 * @returns {string} a string representing the union of the getSourceString types, e.g., "(TypeA|TypeB|TypeC)".
 */
function formatIsaTypesAsUnion(...values) {
  // Map each value to its getSourceString type and join them with a pipe character
  const isaTypes = values.map(value => getSourceString(value));
  // Combine the types into a union type string
  return `(${isaTypes.join('|')})`;
}

module.exports = formatIsaTypesAsUnion;