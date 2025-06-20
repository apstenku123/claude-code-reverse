/**
 * Extracts prefixes from the 'ruleContent' property of each config object in the provided array.
 * For each config object, if 'ruleContent' exists, attempts to extract the prefix before a wildcard (':*')
 * using the 'extractPrefixBeforeWildcard' function. If extraction fails, returns the original 'ruleContent'.
 *
 * @param {Array<{ruleContent?: string}>} configList - Array of config objects, each potentially containing a 'ruleContent' string.
 * @returns {Array<string>} Array of extracted prefixes or original 'ruleContent' strings.
 */
function extractRuleContentPrefixes(configList) {
  return configList.flatMap(config => {
    // Skip configs without a 'ruleContent' property
    if (!config.ruleContent) {
      return [];
    }
    // Try to extract the prefix before ':*' using the helper
    // If extraction fails, return the original ruleContent
    return extractPrefixBeforeWildcard(config.ruleContent) ?? config.ruleContent;
  });
}

module.exports = extractRuleContentPrefixes;
