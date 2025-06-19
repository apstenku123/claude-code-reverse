/**
 * Returns an array of rule objects representing ignore patterns from the provided configuration,
 * excluding those that are already denied in the local settings for the specified tool.
 *
 * @param {Object} config - The configuration object containing ignore patterns.
 * @param {Array<Object>} rules - Array of rule objects to check against denied local settings.
 * @returns {Array<Object>} Array of rule objects with toolName and ruleContent properties.
 */
function getUnignoredLocalRuleContents(config, rules) {
  // If there are no ignore patterns, return an empty array
  if (!config.ignorePatterns || config.ignorePatterns.length < 1) {
    return [];
  }

  // Collect ruleContent values that are denied in local settings for the specific tool
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
  const unignoredPatterns = new Set();
  for (const pattern of config.ignorePatterns) {
    if (!deniedRuleContents.has(pattern)) {
      unignoredPatterns.add(pattern);
    }
  }

  // Map the remaining patterns to the required rule object structure
  return Array.from(unignoredPatterns).map(pattern => ({
    toolName: ND,
    ruleContent: pattern
  }));
}

module.exports = getUnignoredLocalRuleContents;