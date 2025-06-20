/**
 * Creates updated allow and deny rules based on the provided rule configuration.
 *
 * @param {Object} baseRules - The base rules object containing alwaysAllowRules and alwaysDenyRules.
 * @param {Array<Object>} ruleConfigs - An array of rule configuration objects to process.
 * @returns {Object} a new rules object with updated alwaysAllowRules and alwaysDenyRules.
 */
function createAllowRulesFromConfig(baseRules, ruleConfigs) {
  // Clone the alwaysAllowRules and alwaysDenyRules to avoid mutating the originals
  const alwaysAllowRules = { ...baseRules.alwaysAllowRules };
  const alwaysDenyRules = { ...baseRules.alwaysDenyRules };

  for (const ruleConfig of ruleConfigs) {
    // Transform the rule value using the formatToolNameWithRule function
    const processedRuleValue = formatToolNameWithRule(ruleConfig.ruleValue);
    const ruleSource = ruleConfig.source;

    // Determine which rules object to update based on ruleBehavior
    const targetRules = (() => {
      switch (ruleConfig.ruleBehavior) {
        case "allow":
          return alwaysAllowRules;
        case "deny":
          return alwaysDenyRules;
        default:
          return undefined;
      }
    })();

    // If the ruleBehavior is not 'allow' or 'deny', skip this ruleConfig
    if (!targetRules) continue;

    // Initialize the array for this source if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    if (!targetRules[ruleSource]) {
      targetRules[ruleSource] = [];
    }

    // Add the processed rule value to the appropriate array
    targetRules[ruleSource].push(processedRuleValue);
  }

  // Return a new object with the updated rules
  return {
    ...baseRules,
    alwaysAllowRules,
    alwaysDenyRules
  };
}

module.exports = createAllowRulesFromConfig;