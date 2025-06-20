/**
 * Filters and returns the enabled tool objects for a given process configuration.
 *
 * @param {any} processConfig - The configuration or observable for the process (passed to Zv).
 * @param {boolean} includeExtraTools - Whether to include extra tools (yN, TG) in the tool list.
 * @returns {Array<Object>} Array of enabled tool objects.
 */
function getEnabledToolsForProcess(processConfig, includeExtraTools) {
  // Compose the list of tool objects to consider
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
    // Conditionally include Pe if unified read tool is not enabled
    ...(
      process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL
        ? []
        : [Pe]
    ),
    PO,
    EW,
    // Conditionally include yN and TG if includeExtraTools is true
    ...(
      includeExtraTools ? [yN, TG] : []
    ),
    uS2
    // Empty spreads are omitted
  ];

  // Get the list of rules for the process
  const processRules = Zv(processConfig);

  // Filter out tools that have a matching rule with undefined ruleContent
  const filteredTools = toolList.filter(tool => {
    return !processRules.some(ruleObj =>
      ruleObj.ruleValue.toolName === tool.name &&
      ruleObj.ruleValue.ruleContent === undefined
    );
  });

  // Map to an array of booleans indicating if each tool is enabled
  const enabledFlags = filteredTools.map(tool => tool.isEnabled());

  // Return only the tools that are enabled
  return filteredTools.filter((tool, index) => enabledFlags[index]);
}

module.exports = getEnabledToolsForProcess;