/**
 * Aggregates allowed tools from project settings and processes additional tool configurations.
 *
 * This function retrieves the list of allowed tools from the current project settings,
 * formats them into rule objects, and combines them with additional tool configurations
 * processed from the global OM array. The result is a unified array of tool rule objects.
 *
 * @returns {Array<Object>} An array of tool rule objects, each representing either an allowed tool
 *   from project settings or a processed tool configuration from OM.
 */
function getAllowedAndConfiguredTools() {
  const toolRules = [];
  const projectSettings = getProjectSubscriptionConfig(); // Retrieves current project settings, including allowedTools

  // Add allowed tools from project settings as rule objects
  for (const allowedTool of projectSettings.allowedTools) {
    toolRules.push({
      source: "projectSettings",
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(allowedTool)
    });
  }

  // Add processed tool configurations from OM
  for (const toolConfig of OM) {
    // mO1 returns an array of rule objects for each toolConfig
    toolRules.push(...mO1(toolConfig));
  }

  return toolRules;
}

module.exports = getAllowedAndConfiguredTools;