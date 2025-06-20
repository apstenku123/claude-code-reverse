/**
 * Returns a filtered array of enabled tool objects based on the provided source observable and configuration.
 *
 * The function constructs a list of tool objects, conditionally including or excluding certain tools based on environment variables and the provided configuration.
 * It then filters out tools that are denied by always-deny rules (with undefined rule content), and finally returns only those tools that are enabled.
 *
 * @param {Object} sourceObservable - The source observable containing configuration data for rule mappings.
 * @param {boolean} includeExtraTools - If true, includes additional tools in the tool list.
 * @returns {Array<Object>} Array of enabled tool objects.
 */
function getEnabledTools(sourceObservable, includeExtraTools) {
  // Build the initial list of tool objects, conditionally including certain tools
  const toolList = [
    hS2,
    P4,
    UL$,
    oj,
    GC,
    ld,
    UB,
    jI,
    C$,
    uF,
    // Conditionally include 'Pe' if the unified read tool is NOT enabled
    ...(
      process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL
        ? []
        : [Pe]
    ),
    PO,
    EW,
    // Conditionally include 'yN' and 'TG' if includeExtraTools is true
    ...(
      includeExtraTools ? [yN, TG] : []
    ),
    uS2
    // The original code had ...[] twice, which is a no-op
  ];

  // Get always-deny rule mappings for the source observable
  const alwaysDenyRuleMappings = getAlwaysDenyRuleMappings(sourceObservable);

  // Filter out tools that are denied by a rule with undefined rule content
  const allowedTools = toolList.filter(tool => {
    return !alwaysDenyRuleMappings.some(ruleMapping =>
      ruleMapping.ruleValue.toolName === tool.name &&
      ruleMapping.ruleValue.ruleContent === undefined
    );
  });

  // Map to an array indicating if each tool is enabled
  const enabledStatusList = allowedTools.map(tool => tool.isEnabled());

  // Return only the tools that are enabled
  return allowedTools.filter((tool, index) => enabledStatusList[index]);
}

module.exports = getEnabledTools;