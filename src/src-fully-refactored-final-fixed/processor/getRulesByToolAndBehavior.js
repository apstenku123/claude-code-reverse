/**
 * Retrieves a map of rule content to rule objects for a specific tool and rule behavior.
 *
 * Depending on the provided rule behavior ("allow" or "deny"), this function processes the source rules
 * using the appropriate processor (l51 for "allow", Zv for "deny"). It then filters the resulting rules
 * to include only those that match the specified tool name and have defined rule content.
 *
 * @param {Array<Object>} sourceRules - The array of rule objects to process.
 * @param {string} toolName - The name of the tool to filter rules by.
 * @param {string} ruleBehavior - The rule behavior to process ("allow" or "deny").
 * @returns {Map<string, Object>} a map where the key is the rule content and the value is the rule object.
 */
function getRulesByToolAndBehavior(sourceRules, toolName, ruleBehavior) {
  const ruleMap = new Map();
  let processedRules = [];

  // Select the correct processor based on rule behavior
  switch (ruleBehavior) {
    case "allow":
      processedRules = l51(sourceRules);
      break;
    case "deny":
      processedRules = Zv(sourceRules);
      break;
    default:
      // If ruleBehavior is not recognized, return an empty map
      return ruleMap;
  }

  // Filter and map rules by tool name and rule content
  for (const rule of processedRules) {
    const { ruleValue, ruleBehavior: behavior } = rule;
    if (
      ruleValue.toolName === toolName &&
      ruleValue.ruleContent !== undefined &&
      behavior === ruleBehavior
    ) {
      ruleMap.set(ruleValue.ruleContent, rule);
    }
  }

  return ruleMap;
}

module.exports = getRulesByToolAndBehavior;