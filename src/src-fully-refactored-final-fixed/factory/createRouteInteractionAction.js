/**
 * Factory function to create a new SRA (Special Route Action) instance based on the provided pattern and mark.
 * Handles negation, pattern normalization, and route name extraction.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.pattern - The route pattern string, possibly with negation (!).
 * @param {any} params.mark - Additional configuration or marker for the route action.
 * @param {any} subscription - The subscription or context object for the route action.
 * @returns {SRA} a new SRA instance configured with the processed pattern and context.
 */
function createRouteInteractionAction({ pattern, mark }, subscription) {
  let isNegated = false;
  let normalizedPattern = pattern;

  // Check if the pattern starts with '!' indicating negation
  if (normalizedPattern.indexOf('!') === 0) {
    isNegated = true;
    normalizedPattern = normalizedPattern.substr(1);
  }

  // Normalize the pattern: replace Em9 matches with '!' and Um9 matches with '#'
  normalizedPattern = normalizedPattern.replace(Em9, '!').replace(Um9, '#');

  // Extract route names from the normalized pattern
  const routeNames = Sm9(normalizedPattern);

  // Create and return a new SRA instance with all relevant information
  return new SRA(pattern, mark, normalizedPattern, subscription, isNegated, routeNames);
}

module.exports = createRouteInteractionAction;