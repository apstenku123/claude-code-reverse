/**
 * Filters the allowed tools from the source object by removing those that are explicitly allowed by local settings rules.
 *
 * @param {Object} sourceObject - The object containing the allowedTools array.
 * @param {Array<Object>} rules - An array of rule objects to process, each with ruleBehavior, source, and ruleValue.
 * @returns {Array<string>} An array of allowed tool names that are not explicitly allowed by local settings.
 */
function filterAllowedToolsByLocalSettings(sourceObject, rules) {
  // If there are no allowed tools, return an empty array
  if (!sourceObject.allowedTools || sourceObject.allowedTools.length < 1) {
    return [];
  }

  // Collect tool names that are explicitly allowed by local settings
  const locallyAllowedTools = new Set();
  for (const rule of rules) {
    if (rule.ruleBehavior === "allow" && rule.source === "localSettings") {
      // formatToolNameWithRule is assumed to be a function that processes the rule value
      locallyAllowedTools.add(formatToolNameWithRule(rule.ruleValue));
    }
  }

  // Filter out allowed tools that are present in the locally allowed set
  const filteredAllowedTools = new Set();
  for (const tool of sourceObject.allowedTools) {
    if (!locallyAllowedTools.has(tool)) {
      filteredAllowedTools.add(tool);
    }
  }

  // Return the filtered allowed tools as an array
  return Array.from(filteredAllowedTools);
}

module.exports = filterAllowedToolsByLocalSettings;