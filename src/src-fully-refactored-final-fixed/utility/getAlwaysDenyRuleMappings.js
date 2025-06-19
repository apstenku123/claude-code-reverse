/**
 * Retrieves and maps all 'always deny' rules for each configuration source.
 *
 * Iterates over all configuration sources in DxA, retrieves their associated 'always deny' rules from the provided sourceObservable,
 * and returns a flattened array of rule mapping objects with source, behavior, and transformed rule value.
 *
 * @param {Object} sourceObservable - An object containing 'alwaysDenyRules', where each key is a configuration source and the value is an array of rules.
 * @returns {Array<Object>} Array of mapped rule objects with source, ruleBehavior, and ruleValue.
 */
function getAlwaysDenyRuleMappings(sourceObservable) {
  // Iterate over all configuration sources in DxA
  return DxA.flatMap((configSource) => {
    // Retrieve the 'always deny' rules for this source, or an empty array if none exist
    const alwaysDenyRulesForSource = sourceObservable.alwaysDenyRules[configSource] || [];

    // Map each rule to the desired output object
    return alwaysDenyRulesForSource.map((rule) => ({
      source: configSource,
      ruleBehavior: "deny",
      ruleValue: parseToolNameAndRuleContent(rule) // Transform the rule value using parseToolNameAndRuleContent
    }));
  });
}

module.exports = getAlwaysDenyRuleMappings;