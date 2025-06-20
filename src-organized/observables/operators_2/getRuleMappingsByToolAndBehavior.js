/**
 * Retrieves a mapping of rule content to rule mapping objects for a specific tool and rule behavior (allow or deny).
 *
 * @param {Object} sourceObservable - The source observable containing rule configurations.
 * @param {string} toolName - The name of the tool to filter rule mappings by.
 * @param {string} ruleBehavior - The rule behavior to filter by ('allow' or 'deny').
 * @returns {Map<string, Object>} a map where each key is a rule content string and each value is the corresponding rule mapping object.
 */
function getRuleMappingsByToolAndBehavior(sourceObservable, toolName, ruleBehavior) {
  const ruleContentToMapping = new Map();
  let ruleMappings = [];

  // Select the appropriate rule mappings based on the rule behavior
  switch (ruleBehavior) {
    case "allow":
      ruleMappings = getAlwaysAllowRuleBehaviors(sourceObservable);
      break;
    case "deny":
      ruleMappings = getAlwaysDenyRuleMappings(sourceObservable);
      break;
    default:
      // If ruleBehavior is not recognized, return an empty map
      return ruleContentToMapping;
  }

  // Iterate over the rule mappings and filter by toolName and ruleBehavior
  for (const ruleMapping of ruleMappings) {
    const { ruleValue, ruleBehavior: mappingBehavior } = ruleMapping;
    // Ensure the rule mapping matches the tool and behavior, and has defined rule content
    if (
      ruleValue.toolName === toolName &&
      ruleValue.ruleContent !== undefined &&
      mappingBehavior === ruleBehavior
    ) {
      ruleContentToMapping.set(ruleValue.ruleContent, ruleMapping);
    }
  }

  return ruleContentToMapping;
}

module.exports = getRuleMappingsByToolAndBehavior;