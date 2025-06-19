/**
 * Extracts prefixes from the 'ruleContent' property of each config object in the provided array.
 * If 'ruleContent' matches the pattern handled by extractPrefixBeforeAsterisk, its prefix is returned;
 * otherwise, the original 'ruleContent' value is returned. Configs without 'ruleContent' are ignored.
 *
 * @param {Array<Object>} configs - Array of configuration objects, each potentially containing a 'ruleContent' property.
 * @returns {Array<string>} Array of extracted prefixes or original ruleContent values.
 */
function extractRulePrefixesFromConfigs(configs) {
  return configs.flatMap(config => {
    // Skip configs without a ruleContent property
    if (!config.ruleContent) return [];
    // Try to extract prefix using extractPrefixBeforeAsterisk; fallback to original ruleContent
    return extractPrefixBeforeAsterisk(config.ruleContent) ?? config.ruleContent;
  });
}

module.exports = extractRulePrefixesFromConfigs;