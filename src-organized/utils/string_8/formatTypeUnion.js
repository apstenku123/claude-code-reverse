/**
 * Formats a union type string from the provided arguments using getSourceString for type representation.
 *
 * @param {...any} types - The types to be formatted into a union type string.
 * @returns {string} a string representing the union of the provided types, e.g., "(TypeA|TypeB|TypeC)".
 */
function formatTypeUnion(...types) {
  // Map each argument to its getSourceString representation and join with '|', then wrap in parentheses
  return '(' + types.map(type => getSourceString(type)).join('|') + ')';
}

module.exports = formatTypeUnion;