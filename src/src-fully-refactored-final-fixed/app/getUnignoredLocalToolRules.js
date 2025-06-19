/**
 * Filters ignore patterns to return those not denied by local settings for a specific tool.
 *
 * @param {Object} options - The options object containing ignore patterns.
 * @param {Array<string>} options.ignorePatterns - List of ignore pattern strings.
 * @param {Array<Object>} rules - Array of rule objects to check for denied patterns.
 * @returns {Array<Object>} Array of objects each containing toolName and ruleContent for patterns not denied.
 */
function getUnignoredLocalToolRules(options, rules) {
  // Return empty array if there are no ignore patterns
  if (!options.ignorePatterns || options.ignorePatterns.length < 1) return [];

  // Collect all ruleContent values that are denied by local settings for the specific tool
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

  // Filter ignore patterns that are NOT denied
  const unignoredPatterns = new Set();
  for (const pattern of options.ignorePatterns) {
    if (!deniedRuleContents.has(pattern)) {
      unignoredPatterns.add(pattern);
    }
  }

  // Map the unignored patterns to the expected output format
  return Array.from(unignoredPatterns).map(pattern => ({
    toolName: ND,
    ruleContent: pattern
  }));
}

module.exports = getUnignoredLocalToolRules;