/**
 * Retrieves a map of rule content to rule objects for a specific tool name and rule behavior.
 *
 * Depending on the ruleBehavior ('allow' or 'deny'), isBlobOrFileLikeObject fetches the relevant rules from the sourceRules
 * using the appropriate helper function (l51 or Zv). It then filters these rules to include only those
 * that match the specified toolName and ruleBehavior, and have a defined ruleContent. The result is a Map
 * where each key is the ruleContent and the value is the corresponding rule object.
 *
 * @param {Array<Object>} sourceRules - The array of rule objects to process.
 * @param {string} toolName - The name of the tool to filter rules by.
 * @param {string} ruleBehavior - The behavior of the rules to filter ('allow' or 'deny').
 * @returns {Map<string, Object>} Map of ruleContent to rule object for matching rules.
 */
function getRulesByToolNameAndBehavior(sourceRules, toolName, ruleBehavior) {
  const ruleMap = new Map();
  let filteredRules = [];

  // Select the appropriate rule extraction function based on ruleBehavior
  switch (ruleBehavior) {
    case "allow":
      filteredRules = l51(sourceRules);
      break;
    case "deny":
      filteredRules = Zv(sourceRules);
      break;
    default:
      // If ruleBehavior is not recognized, return empty map
      return ruleMap;
  }

  // Iterate through the filtered rules and add matching rules to the map
  for (const rule of filteredRules) {
    const { ruleValue, ruleBehavior: currentBehavior } = rule;
    if (
      ruleValue.toolName === toolName &&
      ruleValue.ruleContent !== undefined &&
      currentBehavior === ruleBehavior
    ) {
      ruleMap.set(ruleValue.ruleContent, rule);
    }
  }

  return ruleMap;
}

module.exports = getRulesByToolNameAndBehavior;