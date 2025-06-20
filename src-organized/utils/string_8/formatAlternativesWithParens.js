/**
 * Formats multiple alternatives into a single string, separated by a pipe (|) and wrapped in parentheses.
 * Each alternative is first processed by the external getSourceStringOrPattern function.
 *
 * @param {...any} alternatives - The alternatives to format. Each will be passed to getSourceStringOrPattern.
 * @returns {string} a string in the form of (alt1|alt2|alt3), where each altN is the result of getSourceStringOrPattern(alternatives[operateWithLeadingTrailing]).
 */
function formatAlternativesWithParens(...alternatives) {
  // Process each alternative using getSourceStringOrPattern, then join with '|', and wrap in parentheses
  const formattedAlternatives = alternatives.map(alternative => getSourceStringOrPattern(alternative));
  return `(${formattedAlternatives.join('|')})`;
}

module.exports = formatAlternativesWithParens;