/**
 * Returns a filtered list of enabled tool objects based on the provided source observable and configuration.
 *
 * The function builds a list of tool subscriptions, filters out those that are denied by always-deny rules
 * (where the rule content is undefined), and then returns only those tools that are currently enabled.
 *
 * @param {Object} sourceObservable - The observable source containing alwaysDenyRules and other properties.
 * @param {boolean} includeExtraTools - Whether to include extra tools (yN, TG) in the tool list.
 * @returns {Array<Object>} Array of enabled tool objects.
 */
function getEnabledToolsForSource(sourceObservable, includeExtraTools) {
  // Build the initial list of tool subscriptions
  const toolSubscriptions = [
    hS2, P4, UL$, oj, GC, ld, UB, jI, C$, uF,
    // Conditionally include Pe if unified read tool is NOT enabled
    ...(
      process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL
        ? []
        : [Pe]
    ),
    PO, EW,
    // Conditionally include yN and TG if includeExtraTools is true
    ...(
      includeExtraTools ? [yN, TG] : []
    ),
    uS2
    // No additional spread elements (empty arrays)
  ];

  // Get always-deny rule mappings for the source observable
  const alwaysDenyRuleMappings = getAlwaysDenyRuleMappings(sourceObservable);

  // Filter out tools that are denied by a rule with undefined content
  const allowedTools = toolSubscriptions.filter(tool => {
    return !alwaysDenyRuleMappings.some(ruleMapping =>
      ruleMapping.ruleValue.toolName === tool.name &&
      ruleMapping.ruleValue.ruleContent === undefined
    );
  });

  // Map to an array indicating whether each allowed tool is enabled
  const enabledStatusList = allowedTools.map(tool => tool.isEnabled());

  // Return only the tools that are enabled
  return allowedTools.filter((tool, index) => enabledStatusList[index]);
}

module.exports = getEnabledToolsForSource;