/**
 * Retrieves all always-allowed rules for each configuration in DxA, mapping them to a standardized rule object.
 *
 * @param {Object} sourceObservable - An object containing alwaysAllowRules, mapping configuration keys to arrays of rules.
 * @returns {Array<Object>} An array of rule objects, each with source, ruleBehavior, and ruleValue properties.
 */
function getAlwaysAllowedRules(sourceObservable) {
  // Iterate over each configuration in DxA and flatten the resulting arrays
  return DxA.flatMap(config => {
    // Get the list of always-allowed rules for this configuration, or an empty array if none
    const alwaysAllowedRules = sourceObservable.alwaysAllowRules[config] || [];
    // Map each rule to a standardized rule object
    return alwaysAllowedRules.map(subscription => ({
      source: config,
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(subscription)
    }));
  });
}

module.exports = getAlwaysAllowedRules;