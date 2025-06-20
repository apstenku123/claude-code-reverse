/**
 * Generates a grouped string expression by applying the getSourceString function to each provided argument and joining the results with a pipe (|) character, wrapped in parentheses.
 *
 * @param {...any} expressions - The list of expressions to be processed by the getSourceString function.
 * @returns {string} a string representing the grouped getSourceString expressions, joined by a pipe and wrapped in parentheses.
 */
function createGroupedMOAExpression(...expressions) {
  // Apply getSourceString to each expression and join them with a pipe
  const moaExpressions = expressions.map(expression => getSourceString(expression));
  // Combine the results into a single string, wrapped in parentheses
  return `(${moaExpressions.join('|')})`;
}

module.exports = createGroupedMOAExpression;