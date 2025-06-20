/**
 * Returns a list of allowed tools that are NOT explicitly allowed by local settings rules.
 *
 * This function filters the provided allowedTools array by removing any tools that have a corresponding
 * 'allow' rule from the localSettings source in the given rules array. The ruleValue is processed by formatToolNameWithRule
 * before comparison.
 *
 * @param {Object} toolSettings - The object containing allowedTools (array of tool identifiers).
 * @param {Array<Object>} rules - Array of rule objects with properties: ruleBehavior, source, ruleValue.
 * @returns {Array<string>} Array of allowed tool identifiers not explicitly allowed by local settings.
 */
function getDisallowedTools(toolSettings, rules) {
  // If there are no allowed tools, return an empty array
  if (!toolSettings.allowedTools || toolSettings.allowedTools.length < 1) {
    return [];
  }

  // Collect all tool identifiers that are explicitly allowed by localSettings rules
  const explicitlyAllowedTools = new Set();
  for (const rule of rules) {
    if (rule.ruleBehavior === "allow" && rule.source === "localSettings") {
      // formatToolNameWithRule processes the ruleValue for comparison
      explicitlyAllowedTools.add(formatToolNameWithRule(rule.ruleValue));
    }
  }

  // Filter out tools that are explicitly allowed by localSettings
  const filteredAllowedTools = new Set();
  for (const tool of toolSettings.allowedTools) {
    if (!explicitlyAllowedTools.has(tool)) {
      filteredAllowedTools.add(tool);
    }
  }

  // Return the filtered tools as an array
  return Array.from(filteredAllowedTools);
}

module.exports = getDisallowedTools;