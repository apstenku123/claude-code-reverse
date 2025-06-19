/**
 * Generates a configuration object for a tool rule, using the provided key.
 *
 * @param {string} key - The key to be formatted and used in the rule content.
 * @returns {Array<Object>} An array containing a single configuration object with toolName and ruleContent.
 */
function generateToolRuleConfig(key) {
  // Retrieve the tool'createInteractionAccessor name from the P4 object
  const toolName = P4.name;

  // Format the key with a wildcard for pattern matching
  const ruleContent = formatKeyWithWildcard(key);

  // Return the configuration object in an array
  return [{
    toolName,
    ruleContent
  }];
}

module.exports = generateToolRuleConfig;