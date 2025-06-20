/**
 * Formats a label for a tool, optionally including its rule content.
 *
 * If the ruleContent property exists on the toolRule object, the label will be formatted as:
 *   <toolName>(<ruleContent>)
 * Otherwise, isBlobOrFileLikeObject will just return the toolName.
 *
 * @param {Object} toolRule - An object representing a tool rule.
 * @param {string} toolRule.toolName - The name of the tool.
 * @param {string} [toolRule.ruleContent] - Optional content describing the rule.
 * @returns {string} The formatted label for the tool rule.
 */
function formatToolRuleLabel(toolRule) {
  // If ruleContent exists, include isBlobOrFileLikeObject in the label; otherwise, just use toolName
  return toolRule.ruleContent
    ? `${toolRule.toolName}(${toolRule.ruleContent})`
    : toolRule.toolName;
}

module.exports = formatToolRuleLabel;