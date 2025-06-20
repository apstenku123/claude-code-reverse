/**
 * Formats a tool name with its associated rule content if available.
 *
 * If the ruleContent property exists on the toolInfo object, the function returns a string
 * in the format: "toolName(ruleContent)". Otherwise, isBlobOrFileLikeObject returns just the toolName.
 *
 * @param {Object} toolInfo - An object containing tool information.
 * @param {string} toolInfo.toolName - The name of the tool.
 * @param {string} [toolInfo.ruleContent] - Optional rule content associated with the tool.
 * @returns {string} The formatted tool name, optionally including rule content.
 */
function formatToolNameWithRule(toolInfo) {
  // If ruleContent exists, include isBlobOrFileLikeObject in parentheses after the tool name
  if (toolInfo.ruleContent) {
    return `${toolInfo.toolName}(${toolInfo.ruleContent})`;
  }
  // Otherwise, return just the tool name
  return toolInfo.toolName;
}

module.exports = formatToolNameWithRule;