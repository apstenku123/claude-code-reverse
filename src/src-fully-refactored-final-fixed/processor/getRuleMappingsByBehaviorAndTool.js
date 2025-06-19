/**
 * Retrieves a mapping of rule content to rule objects for a specific tool and rule behavior (allow or deny).
 *
 * Depending on the provided behavior ("allow" or "deny"), this function gathers all relevant rule behaviors
 * for the given source observable, filters them by the specified tool name, and returns a Map where each key
 * is the rule content and each value is the corresponding rule object.
 *
 * @param {Object} sourceObservable - The source observable containing rule configurations.
 * @param {string} toolName - The name of the tool to filter rules by.
 * @param {string} ruleBehavior - The rule behavior to process ("allow" or "deny").
 * @returns {Map<string, Object>} Map of rule content to rule object for the specified tool and behavior.
 */
function getRuleMappingsByBehaviorAndTool(sourceObservable, toolName, ruleBehavior) {
  const ruleContentToRuleMap = new Map();
  let ruleBehaviors = [];

  // Select the appropriate rule behaviors based on the ruleBehavior argument
  switch (ruleBehavior) {
    case "allow":
      // Retrieve all 'always allow' rule behaviors
      ruleBehaviors = getAlwaysAllowRuleBehaviors(sourceObservable);
      break;
    case "deny":
      // Retrieve all 'always deny' rule mappings
      ruleBehaviors = getAlwaysDenyRuleMappings(sourceObservable);
      break;
    default:
      // If an unsupported behavior is provided, return an empty map
      return ruleContentToRuleMap;
  }

  // Filter and map rules for the specified tool and behavior
  for (const rule of ruleBehaviors) {
    const { ruleValue, ruleBehavior: behavior } = rule;
    if (
      ruleValue.toolName === toolName &&
      ruleValue.ruleContent !== undefined &&
      behavior === ruleBehavior
    ) {
      ruleContentToRuleMap.set(ruleValue.ruleContent, rule);
    }
  }

  return ruleContentToRuleMap;
}

module.exports = getRuleMappingsByBehaviorAndTool;