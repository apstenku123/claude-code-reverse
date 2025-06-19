/**
 * Retrieves detailed information about all 'always deny' rules for each configuration.
 *
 * Iterates over all configurations in DxA, and for each configuration, collects its associated 'always deny' rules
 * from the provided sourceObservable. Each rule is mapped to an object containing the configuration name,
 * the behavior ('deny'), and the processed rule value using the parseToolNameAndRuleContent function.
 *
 * @param {Object} sourceObservable - An object containing 'alwaysDenyRules', where each key is a configuration name
 *                                    and the value is an array of rule values to always deny for that configuration.
 * @returns {Array<Object>} An array of objects, each representing a deny rule with its source, behavior, and processed value.
 */
function getAlwaysDenyRuleDetails(sourceObservable) {
  // For each configuration in DxA, map its alwaysDenyRules (if any) to a detailed object
  return DxA.flatMap(configurationName => {
    // Get the array of always deny rules for this configuration, or an empty array if none exist
    const alwaysDenyRules = sourceObservable.alwaysDenyRules[configurationName] || [];
    // Map each rule to a detailed object
    return alwaysDenyRules.map(ruleValue => ({
      source: configurationName,
      ruleBehavior: "deny",
      ruleValue: parseToolNameAndRuleContent(ruleValue)
    }));
  });
}

module.exports = getAlwaysDenyRuleDetails;
