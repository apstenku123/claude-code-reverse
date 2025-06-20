/**
 * Filters ignore patterns from the provided configuration, excluding those that are denied by local settings for the specified tool.
 *
 * @param {Object} config - The configuration object containing ignore patterns.
 * @param {Array<Object>} rules - An array of rule objects to check for denied patterns.
 * @returns {Array<Object>} An array of ignore pattern objects not denied by local settings for the tool ND.
 */
function getNonDeniedIgnorePatterns(config, rules) {
  // Return an empty array if there are no ignore patterns
  if (!config.ignorePatterns || config.ignorePatterns.length < 1) {
    return [];
  }

  // Collect all rule contents that are denied by local settings for the tool ND
  const deniedRuleContents = new Set();
  for (const rule of rules) {
    if (
      rule.ruleBehavior === "deny" &&
      rule.source === "localSettings" &&
      rule.ruleValue.toolName === ND &&
      rule.ruleValue.ruleContent !== undefined
    ) {
      deniedRuleContents.add(rule.ruleValue.ruleContent);
    }
  }

  // Filter ignore patterns that are not denied
  const allowedIgnorePatterns = new Set();
  for (const pattern of config.ignorePatterns) {
    if (!deniedRuleContents.has(pattern)) {
      allowedIgnorePatterns.add(pattern);
    }
  }

  // Map the allowed patterns to the required object structure
  return Array.from(allowedIgnorePatterns).map(pattern => ({
    toolName: ND,
    ruleContent: pattern
  }));
}

module.exports = getNonDeniedIgnorePatterns;