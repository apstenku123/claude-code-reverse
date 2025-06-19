/**
 * Creates updated allow and deny rules based on provided rule entries.
 *
 * @param {Object} baseRules - The base rules object containing alwaysAllowRules and alwaysDenyRules.
 * @param {Array<Object>} ruleEntries - An array of rule entry objects to process and add to allow/deny rules.
 * @returns {Object} The updated rules object with modified alwaysAllowRules and alwaysDenyRules.
 */
function createAllowRulesFactory(baseRules, ruleEntries) {
  // Clone the alwaysAllowRules and alwaysDenyRules to avoid mutating the originals
  const alwaysAllowRules = { ...baseRules.alwaysAllowRules };
  const alwaysDenyRules = { ...baseRules.alwaysDenyRules };

  for (const ruleEntry of ruleEntries) {
    // Transform the rule value using external function formatToolNameWithRule
    const transformedRuleValue = formatToolNameWithRule(ruleEntry.ruleValue);
    const ruleSource = ruleEntry.source;

    // Determine which rule set to update based on ruleBehavior
    const targetRules = (() => {
      switch (ruleEntry.ruleBehavior) {
        case "allow":
          return alwaysAllowRules;
        case "deny":
          return alwaysDenyRules;
        default:
          return undefined;
      }
    })();

    // If the ruleBehavior is not 'allow' or 'deny', skip this entry
    if (!targetRules) continue;

    // Initialize the array for this source if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
    if (!targetRules[ruleSource]) {
      targetRules[ruleSource] = [];
    }

    // Add the transformed rule value to the appropriate rule set
    targetRules[ruleSource].push(transformedRuleValue);
  }

  // Return a new object with updated allow and deny rules
  return {
    ...baseRules,
    alwaysAllowRules,
    alwaysDenyRules
  };
}

module.exports = createAllowRulesFactory;