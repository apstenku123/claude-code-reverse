/**
 * Generates an array of rule objects representing allowed tools and additional rules.
 * 
 * This function retrieves the current configuration (via getProjectSubscriptionConfig()), iterates over the list of allowed tools,
 * and creates a rule object for each. It then processes additional rules from the OM collection using mO1,
 * and appends them to the result array. The final array contains all rule objects to be used elsewhere.
 *
 * @returns {Array<Object>} Array of rule objects, each describing a tool or rule and its behavior/value.
 */
function getAllowedToolsRules() {
  const rules = [];
  const config = getProjectSubscriptionConfig();

  // Add rules for each allowed tool from project settings
  for (const allowedTool of config.allowedTools) {
    rules.push({
      source: "projectSettings",
      ruleBehavior: "allow",
      ruleValue: parseToolNameAndRuleContent(allowedTool)
    });
  }

  // Add rules from the OM collection using mO1
  for (const ruleItem of OM) {
    rules.push(...mO1(ruleItem));
  }

  return rules;
}

module.exports = getAllowedToolsRules;