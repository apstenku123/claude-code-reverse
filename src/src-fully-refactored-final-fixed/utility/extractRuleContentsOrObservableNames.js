/**
 * Extracts observable names or rule contents from an array of configuration objects.
 * For each configuration object, if 'ruleContent' exists, attempts to extract the observable name
 * using 'extractObservableName'. If extraction fails, returns the original 'ruleContent'.
 *
 * @param {Array<Object>} configList - Array of configuration objects, each possibly containing a 'ruleContent' property.
 * @returns {Array<string>} An array of observable names or rule contents, filtered from the input array.
 */
function extractRuleContentsOrObservableNames(configList) {
  return configList.flatMap(config => {
    // Skip configs without 'ruleContent'
    if (!config.ruleContent) return [];
    // Try to extract observable name; fallback to original ruleContent if extraction fails
    return extractObservableName(config.ruleContent) ?? config.ruleContent;
  });
}

module.exports = extractRuleContentsOrObservableNames;