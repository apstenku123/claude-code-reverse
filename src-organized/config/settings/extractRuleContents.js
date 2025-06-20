/**
 * Extracts and flattens rule content from an array of rule configuration objects.
 * For each configuration object, if isBlobOrFileLikeObject has a 'ruleContent' property, attempts to process isBlobOrFileLikeObject
 * with the '_o1' function. If '_o1' returns a non-null/undefined value, that value is used;
 * otherwise, the original 'ruleContent' is used. The results are flattened into a single array.
 *
 * @param {Array<Object>} ruleConfigs - An array of rule configuration objects, each potentially containing a 'ruleContent' property.
 * @returns {Array<any>} a flattened array of processed rule contents.
 */
function extractRuleContents(ruleConfigs) {
  return ruleConfigs.flatMap(config => {
    // Skip configs without ruleContent
    if (!config.ruleContent) {
      return [];
    }
    // Attempt to process ruleContent with _o1; fallback to original if _o1 returns null/undefined
    return _o1(config.ruleContent) ?? config.ruleContent;
  });
}

module.exports = extractRuleContents;