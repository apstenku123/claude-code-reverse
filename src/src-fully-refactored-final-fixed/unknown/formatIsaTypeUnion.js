/**
 * Formats a union type string from the provided arguments using the getSourceString function.
 * Each argument is passed to getSourceString, and the results are joined with a pipe (|) and wrapped in parentheses.
 *
 * @param {...any} types - The types or values to be formatted into a union type string.
 * @returns {string} The formatted union type string, e.g., "(TypeA|TypeB|TypeC)".
 */
function formatIsaTypeUnion(...types) {
  // Map each type/value to its getSourceString representation and join with '|', then wrap in parentheses
  return '(' + types.map(type => getSourceString(type)).join('|') + ')';
}

module.exports = formatIsaTypeUnion;