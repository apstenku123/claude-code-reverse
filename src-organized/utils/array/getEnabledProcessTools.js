/**
 * Filters and returns enabled process tools based on provided configuration and rules.
 *
 * @param {Object} sourceObservable - The observable source containing rule mappings.
 * @param {boolean} includeExtraTools - Flag to include additional tools (e.g., yN, TG) if true.
 * @returns {Array<Object>} Array of enabled tool objects after applying rule-based filtering.
 */
function getEnabledProcessTools(sourceObservable, includeExtraTools) {
  // Build the initial list of tool modules, conditionally including some based on environment/config
  const toolModules = [
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
    // Only include Pe if unified read tool is NOT enabled
    ...(
      process.env.CLAUDE_CODE_ENABLE_UNIFIED_READ_TOOL
        ? []
        : [Pe]
    ),
    PO,
    EW,
    // Optionally include yN and TG if includeExtraTools is true
    ...(
      includeExtraTools ? [yN, TG] : []
    ),
    uS2
    // No-op spreads for ...[] in original code
  ];

  // Get the deny rule mappings from the observable
  const alwaysDenyRuleMappings = getAlwaysDenyRuleMappings(sourceObservable);

  // Filter out tools that are denied by rules with undefined content
  const filteredTools = toolModules.filter(tool => {
    // Exclude tool if any deny rule matches its name and has undefined ruleContent
    return !alwaysDenyRuleMappings.some(ruleMapping =>
      ruleMapping.ruleValue.toolName === tool.name &&
      ruleMapping.ruleValue.ruleContent === undefined
    );
  });

  // Map to an array of booleans indicating if each tool is enabled
  const enabledFlags = filteredTools.map(tool => tool.isEnabled());

  // Return only the tools that are enabled
  return filteredTools.filter((tool, index) => enabledFlags[index]);
}

module.exports = getEnabledProcessTools;