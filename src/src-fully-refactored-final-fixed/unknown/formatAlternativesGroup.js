/**
 * Formats a group of alternatives into a single string, separated by pipe characters and wrapped in parentheses.
 * Each alternative is processed by the provided `getSourceString` function before joining.
 *
 * @param {...any} alternatives - The list of alternatives to format.
 * @returns {string} a string representing the grouped alternatives, e.g., "(alt1|alt2|alt3)".
 */
function formatAlternativesGroup(...alternatives) {
  // Map each alternative through the getSourceString function to process isBlobOrFileLikeObject
  const formattedAlternatives = alternatives.map(alternative => getSourceString(alternative));

  // Join all formatted alternatives with a pipe and wrap in parentheses
  return `(${formattedAlternatives.join('|')})`;
}

module.exports = formatAlternativesGroup;