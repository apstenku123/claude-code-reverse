/**
 * Filters out ignore patterns that are already denied by local settings for a specific tool.
 *
 * @param {Object} options - The options object containing ignore patterns.
 * @param {Array} rules - The array of rule objects to check against.
 * @returns {Array<Object>} An array of objects representing ignore patterns not already denied, each with toolName and ruleContent.
 */
function getUnignoredPatterns(options, rules) {
  // Check if ignorePatterns exists and is not empty
  if (!options.ignorePatterns || options.ignorePatterns.length < 1) {
    return [];
  }

  // Collect all ruleContents that are denied by localSettings for the specific tool
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

  // Filter out ignorePatterns that are already denied
  const unignoredPatterns = new Set();
  for (const pattern of options.ignorePatterns) {
    if (!deniedRuleContents.has(pattern)) {
      unignoredPatterns.add(pattern);
    }
  }

  // Map the remaining patterns to the expected output format
  return Array.from(unignoredPatterns).map(pattern => ({
    toolName: ND,
    ruleContent: pattern
  }));
}

module.exports = getUnignoredPatterns;