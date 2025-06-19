/**
 * Updates the alwaysAllowRules and alwaysDenyRules objects in the given rulesConfig
 * by processing an array of ruleEntry objects. Each ruleEntry specifies a rule value,
 * its source, and whether isBlobOrFileLikeObject should be added to the allow or deny set.
 *
 * @param {Object} rulesConfig - The configuration object containing alwaysAllowRules and alwaysDenyRules.
 * @param {Object} rulesConfig.alwaysAllowRules - An object mapping sources to arrays of allowed rule values.
 * @param {Object} rulesConfig.alwaysDenyRules - An object mapping sources to arrays of denied rule values.
 * @param {Array<Object>} ruleEntries - An array of rule entry objects to process.
 * @param {string} ruleEntries[].ruleValue - The value of the rule to add.
 * @param {string} ruleEntries[].source - The source key for the rule.
 * @param {"allow"|"deny"} ruleEntries[].ruleBehavior - Indicates if the rule should be allowed or denied.
 * @returns {Object} a new rulesConfig object with updated alwaysAllowRules and alwaysDenyRules.
 */
function updateRuleSetsWithEntries(rulesConfig, ruleEntries) {
  // Clone the allow and deny rules to avoid mutating the original objects
  const alwaysAllowRules = { ...rulesConfig.alwaysAllowRules };
  const alwaysDenyRules = { ...rulesConfig.alwaysDenyRules };

  for (const ruleEntry of ruleEntries) {
    // Transform the rule value using formatToolNameWithRule(external function)
    const transformedRuleValue = formatToolNameWithRule(ruleEntry.ruleValue);
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
    if (!targetRulesSet[sourceKey]) {
      targetRulesSet[sourceKey] = [];
    }
    // Add the transformed rule value to the appropriate rules set
    targetRulesSet[sourceKey].push(transformedRuleValue);
  }

  // Return a new config object with updated rules
  return {
    ...rulesConfig,
    alwaysAllowRules,
    alwaysDenyRules
  };
}

module.exports = updateRuleSetsWithEntries;