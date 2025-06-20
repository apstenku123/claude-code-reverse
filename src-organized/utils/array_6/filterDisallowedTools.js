/**
 * Filters out tools from the allowedTools array that are explicitly allowed by local settings rules.
 *
 * @param {Object} toolConfig - The configuration object containing allowed tools.
 * @param {Array<Object>} ruleList - Array of rule objects to evaluate against allowed tools.
 * @returns {Array<string>} - Array of tool names that are allowed but not explicitly allowed by local settings.
 */
function filterDisallowedTools(toolConfig, ruleList) {
  // If there are no allowed tools, return an empty array
  if (!toolConfig.allowedTools || toolConfig.allowedTools.length < 1) {
    return [];
  }

  // Collect all tool names that are explicitly allowed by local settings rules
  const locallyAllowedTools = new Set();
  for (const rule of ruleList) {
    if (rule.ruleBehavior === "allow" && rule.source === "localSettings") {
      // formatToolNameWithRule presumably normalizes or transforms the rule value to a tool name
      locallyAllowedTools.add(formatToolNameWithRule(rule.ruleValue));
    }
  }

  // Filter out tools from allowedTools that are present in locallyAllowedTools
  const filteredTools = new Set();
  for (const toolName of toolConfig.allowedTools) {
    if (!locallyAllowedTools.has(toolName)) {
      filteredTools.add(toolName);
    }
  }

  // Return the filtered tools as an array
  return Array.from(filteredTools);
}

module.exports = filterDisallowedTools;