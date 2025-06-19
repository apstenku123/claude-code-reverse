/**
 * Updates the alwaysAllowRules and alwaysDenyRules in the provided ruleSet object
 * based on an array of ruleConfig entries. Each entry specifies a rule value, its source,
 * and whether isBlobOrFileLikeObject should be allowed or denied. The function clones the original rule sets
 * to avoid mutation and appends new rule values to the appropriate allow/deny lists.
 *
 * @param {Object} ruleSet - The original rule set object containing alwaysAllowRules and alwaysDenyRules.
 * @param {Array<Object>} ruleConfigs - Array of rule configuration objects to process.
 *   Each object should have the following properties:
 *     - ruleValue: The value of the rule to process (will be transformed by formatToolNameWithRule).
 *     - source: The key in the allow/deny rules to update.
 *     - ruleBehavior: Either 'allow' or 'deny', determines which rule set to update.
 * @returns {Object} a new rule set object with updated alwaysAllowRules and alwaysDenyRules.
 */
function updateRuleSetsWithBehaviors(ruleSet, ruleConfigs) {
  // Clone the alwaysAllowRules and alwaysDenyRules to avoid mutating the input
  const alwaysAllowRules = {
    ...ruleSet.alwaysAllowRules
  };
  const alwaysDenyRules = {
    ...ruleSet.alwaysDenyRules
  };

  for (const ruleConfig of ruleConfigs) {
    // Transform the rule value using formatToolNameWithRule(external function)
    const transformedRuleValue = formatToolNameWithRule(ruleConfig.ruleValue);
    const ruleSource = ruleConfig.source;

    // Determine which rule set to update based on ruleBehavior
    const targetRuleSet = (() => {
      switch (ruleConfig.ruleBehavior) {
        case "allow":
          return alwaysAllowRules;
        case "deny":
          return alwaysDenyRules;
        default:
          return undefined;
      }
    })();

    // If the ruleBehavior is not 'allow' or 'deny', skip this entry
    if (!targetRuleSet) continue;

    // Initialize the array for this source if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    if (!targetRuleSet[ruleSource]) {
      targetRuleSet[ruleSource] = [];
    }

    // Add the transformed rule value to the appropriate rule set
    targetRuleSet[ruleSource].push(transformedRuleValue);
  }

  // Return a new ruleSet object with updated allow/deny rules
  return {
    ...ruleSet,
    alwaysAllowRules,
    alwaysDenyRules
  };
}

module.exports = updateRuleSetsWithBehaviors;