/**
 * Generates a rule object for a wildcard route pattern.
 *
 * This function creates an array containing a single rule object. The rule object includes:
 *   - toolName: The name of the tool (from the P4 object)
 *   - ruleContent: The provided route name with a wildcard suffix appended (using formatRouteNameWithWildcard)
 *
 * @param {string} routeName - The base route name to which a wildcard will be appended.
 * @returns {Array<{toolName: string, ruleContent: string}>} An array containing a single rule object for the wildcard route.
 */
function createWildcardRouteRule(routeName) {
  return [
    {
      // The name of the tool generating the rule
      toolName: P4.name,
      // The route name with a wildcard suffix appended
      ruleContent: formatRouteNameWithWildcard(routeName)
    }
  ];
}

module.exports = createWildcardRouteRule;