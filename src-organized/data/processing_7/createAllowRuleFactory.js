/**
 * Creates a new rules object by merging existing always-allow and always-deny rules
 * with additional rules specified in the rulesToAdd array. Each rule in rulesToAdd
 * is added to either the allow or deny set based on its behavior.
 *
 * @param {Object} baseRules - The base rules object containing alwaysAllowRules and alwaysDenyRules.
 * @param {Array<Object>} rulesToAdd - Array of rule objects to add. Each object should have:
 *   - ruleValue: The value of the rule (to be processed by formatToolNameWithRule)
 *   - source: The source key to group rules under
 *   - ruleBehavior: Either 'allow' or 'deny'
 * @returns {Object} a new rules object with updated alwaysAllowRules and alwaysDenyRules.
 */
function createAllowRuleFactory(baseRules, rulesToAdd) {
  // Clone the alwaysAllowRules and alwaysDenyRules to avoid mutating the originals
  const alwaysAllowRules = {
    ...baseRules.alwaysAllowRules
  };
  const alwaysDenyRules = {
    ...baseRules.alwaysDenyRules
  };

  for (const ruleEntry of rulesToAdd) {
    // Process the rule value using formatToolNameWithRule(external dependency)
    const processedRuleValue = formatToolNameWithRule(ruleEntry.ruleValue);
    const sourceKey = ruleEntry.source;

    // Determine which rules set to update based on ruleBehavior
    const targetRulesSet = (() => {
      switch (ruleEntry.ruleBehavior) {
        case "allow":
          return alwaysAllowRules;
        case "deny":
          return alwaysDenyRules;
        default:
          return undefined;
      }
    })();

    // Initialize the array for this source if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    if (targetRulesSet && !targetRulesSet[sourceKey]) {
      targetRulesSet[sourceKey] = [];
    }
    // Add the processed rule value to the appropriate rules set
    if (targetRulesSet && targetRulesSet[sourceKey]) {
      targetRulesSet[sourceKey].push(processedRuleValue);
    }
  }

  // Return a new object with updated alwaysAllowRules and alwaysDenyRules
  return {
    ...baseRules,
    alwaysAllowRules,
    alwaysDenyRules
  };
}

module.exports = createAllowRuleFactory;