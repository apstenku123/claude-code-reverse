/**
 * Retrieves a map of rule content to rule objects filtered by tool name and rule behavior.
 *
 * @param {Object} sourceObservable - The source observable or data structure containing rules.
 * @param {string} toolName - The name of the tool to filter rules by.
 * @param {string} ruleBehavior - The rule behavior to filter by (e.g., 'allow' or 'deny').
 * @returns {Map<string, Object>} a map where each key is a rule'createInteractionAccessor content and each value is the corresponding rule object.
 */
function getRuleContentMapByBehaviorAndTool(sourceObservable, toolName, ruleBehavior) {
  const ruleContentMap = new Map();
  let filteredRules = [];

  // Select the appropriate rule extraction function based on ruleBehavior
  switch (ruleBehavior) {
    case "allow":
      filteredRules = l51(sourceObservable);
      break;
    case "deny":
      filteredRules = Zv(sourceObservable);
      break;
    default:
      // If ruleBehavior is not recognized, return an empty map
      return ruleContentMap;
  }

  // Iterate over the filtered rules and add matching ones to the map
  for (const rule of filteredRules) {
    const { ruleValue, ruleBehavior: currentBehavior } = rule;
    // Ensure the rule matches the toolName, has defined ruleContent, and matches the desired behavior
    if (
      ruleValue.toolName === toolName &&
      ruleValue.ruleContent !== undefined &&
      currentBehavior === ruleBehavior
    ) {
      ruleContentMap.set(ruleValue.ruleContent, rule);
    }
  }

  return ruleContentMap;
}

module.exports = getRuleContentMapByBehaviorAndTool;