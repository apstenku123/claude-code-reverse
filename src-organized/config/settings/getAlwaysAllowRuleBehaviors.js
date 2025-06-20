/**
 * Generates an array of rule behavior objects for all always-allow rules across provided configurations.
 *
 * Iterates over each configuration in DxA, retrieves the corresponding always-allow rules from the sourceObservable,
 * and maps them into objects describing the rule behavior, value, and source configuration.
 *
 * @param {Object} sourceObservable - The object containing alwaysAllowRules, mapping configuration names to arrays of rules.
 * @returns {Array<Object>} Array of rule behavior objects, each with source, ruleBehavior, and ruleValue properties.
 */
function getAlwaysAllowRuleBehaviors(sourceObservable) {
  return DxA.flatMap(config => {
    // Get the list of always-allow rules for this config, or an empty array if none exist
    const alwaysAllowRules = sourceObservable.alwaysAllowRules[config] || [];
    // Map each rule to a rule behavior object
    return alwaysAllowRules.map(subscription => ({
      source: config,
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(subscription)
    }));
  });
}

module.exports = getAlwaysAllowRuleBehaviors;