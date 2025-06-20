/**
 * Determines if a rule'createInteractionAccessor content is undefined or if the tool name matches the provided source, 
 * or if both tool names are unresolved but share the same server name.
 *
 * @param {Object} sourceTool - The source tool object, expected to have a 'name' property.
 * @param {Object} ruleConfig - The rule configuration object, expected to have a 'ruleValue' property.
 * @returns {boolean} Returns true if the rule'createInteractionAccessor tool name matches the source tool'createInteractionAccessor name, or if both tool names are unresolved but share the same server name. Returns false if the rule content is defined or if none of the conditions are met.
 */
function isRuleContentUndefinedOrMatchingTool(sourceTool, ruleConfig) {
  // If the rule content is defined, return false immediately
  if (ruleConfig.ruleValue.ruleContent !== undefined) {
    return false;
  }

  // If the tool name in the rule matches the source tool'createInteractionAccessor name, return true
  if (ruleConfig.ruleValue.toolName === sourceTool.name) {
    return true;
  }

  // Attempt to resolve tool information for both the rule and the source tool
  const resolvedRuleTool = parseMcpServerToolString(ruleConfig.ruleValue.toolName);
  const resolvedSourceTool = parseMcpServerToolString(sourceTool.name);

  // If both tool names are unresolved (not null), and the resolved rule tool has no toolName
  // but both share the same serverName, return true
  if (
    resolvedRuleTool !== null &&
    resolvedSourceTool !== null &&
    resolvedRuleTool.toolName === undefined &&
    resolvedRuleTool.serverName === resolvedSourceTool.serverName
  ) {
    return true;
  }

  // Otherwise, return false
  return false;
}

module.exports = isRuleContentUndefinedOrMatchingTool;