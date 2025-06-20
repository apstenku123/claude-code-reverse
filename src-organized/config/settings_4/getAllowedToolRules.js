/**
 * Retrieves a list of rule objects representing allowed tools from project settings and additional sources.
 *
 * This function gathers all allowed tools specified in the current configuration (via getProjectSubscriptionConfig()),
 * formats them into rule objects, and then appends any additional rules provided by mO1 for each entry in OM.
 *
 * @returns {Array<Object>} An array of rule objects, each describing an allowed tool or additional rule.
 */
function getAllowedToolRules() {
  const rules = [];
  // Retrieve the current configuration, which includes allowed tools
  const config = getProjectSubscriptionConfig();

  // Add a rule object for each allowed tool from project settings
  for (const allowedTool of config.allowedTools) {
    rules.push({
      source: "projectSettings",
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(allowedTool)
    });
  }

  // Add additional rules from OM (external/global array), using mO1 to process each entry
  for (const omEntry of OM) {
    // mO1 returns an array of rule objects for each OM entry
    rules.push(...mO1(omEntry));
  }

  return rules;
}

module.exports = getAllowedToolRules;