/**
 * Retrieves all 'always allow' rule behaviors for the provided observable.
 *
 * Iterates over all configurations in DxA, and for each configuration,
 * collects the associated 'always allow' rules from the observable'createInteractionAccessor alwaysAllowRules property.
 * Each rule is mapped to an object describing its source, behavior, and transformed value.
 *
 * @param {Object} sourceObservable - The observable object containing alwaysAllowRules.
 * @returns {Array<Object>} Array of rule behavior objects with source, ruleBehavior, and ruleValue.
 */
function getAlwaysAllowedRuleBehaviors(sourceObservable) {
  // DxA is assumed to be an array of configuration keys
  // parseToolNameAndRuleContent is a function that transforms a rule
  return DxA.flatMap(configKey => {
    // Get the array of always-allow rules for this configKey, or an empty array if none
    const alwaysAllowRulesForConfig = sourceObservable.alwaysAllowRules[configKey] || [];
    // Map each rule to a rule behavior object
    return alwaysAllowRulesForConfig.map(subscriptionRule => ({
      source: configKey,
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(subscriptionRule)
    }));
  });
}

module.exports = getAlwaysAllowedRuleBehaviors;