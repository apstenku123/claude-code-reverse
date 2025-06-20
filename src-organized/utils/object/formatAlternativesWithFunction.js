/**
 * Formats multiple input values by applying a transformation function to each,
 * then joins them with a pipe (|) and wraps the result in parentheses.
 *
 * @param {...any} values - The values to be transformed and formatted as alternatives.
 * @returns {string} The formatted string representing alternatives.
 */
function formatAlternativesWithFunction(...values) {
  // Apply getSourceStringOrPattern transformation to each value and join with '|', then wrap in parentheses
  const transformedValues = values.map(value => getSourceStringOrPattern(value));
  return `(${transformedValues.join('|')})`;
}

module.exports = formatAlternativesWithFunction;