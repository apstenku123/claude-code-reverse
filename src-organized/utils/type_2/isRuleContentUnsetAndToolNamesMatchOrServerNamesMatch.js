/**
 * Determines if a rule'createInteractionAccessor content is unset and if the tool names match, or if the server names match when tool names are not defined.
 *
 * @param {Object} sourceTool - The source tool object, expected to have a 'name' property.
 * @param {Object} ruleConfig - The rule configuration object, expected to have a 'ruleValue' property with 'ruleContent' and 'toolName'.
 * @returns {boolean} Returns true if the rule'createInteractionAccessor content is unset and either the tool names match, or the server names match when tool names are undefined. Returns false otherwise.
 */
function isRuleContentUnsetAndToolNamesMatchOrServerNamesMatch(sourceTool, ruleConfig) {
  // If the rule content is defined, return false immediately
  if (ruleConfig.ruleValue.ruleContent !== undefined) {
    return false;
  }

  // If the tool names match exactly, return true
  if (ruleConfig.ruleValue.toolName === sourceTool.name) {
    return true;
  }

  // Attempt to extract tool/server information from both tool names
  const ruleToolInfo = parseMcpServerToolString(ruleConfig.ruleValue.toolName);
  const sourceToolInfo = parseMcpServerToolString(sourceTool.name);

  // If both tool infos are valid objects, and ruleToolInfo has no toolName property,
  // but their serverNames match, return true
  if (
    ruleToolInfo !== null &&
    sourceToolInfo !== null &&
    ruleToolInfo.toolName === undefined &&
    ruleToolInfo.serverName === sourceToolInfo.serverName
  ) {
    return true;
  }

  // Otherwise, return false
  return false;
}

module.exports = isRuleContentUnsetAndToolNamesMatchOrServerNamesMatch;