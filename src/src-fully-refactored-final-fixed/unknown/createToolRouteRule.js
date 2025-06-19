/**
 * Generates a rule object for a tool route with a wildcard pattern.
 *
 * @param {string} routeName - The base name of the route to be formatted with a wildcard.
 * @returns {Array<{toolName: string, ruleContent: string}>} An array containing a single rule object with the tool'createInteractionAccessor name and the formatted route rule.
 */
function createToolRouteRule(routeName) {
  // Get the tool'createInteractionAccessor name from the external P4 object
  const toolName = P4.name;
  // Format the route name with a wildcard pattern using formatRouteWithWildcard (formatKeyWithWildcard)
  const ruleContent = formatRouteWithWildcard(routeName);

  // Return the rule object inside an array
  return [{
    toolName,
    ruleContent
  }];
}

module.exports = createToolRouteRule;