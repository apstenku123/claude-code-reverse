/**
 * Generates a detailed description of the fast content search tool, including usage notes and recommendations.
 *
 * @param {Array<{name: string}>} toolList - List of tool objects, each with a 'name' property.
 * @returns {string} Multi-line description of the search tool and related recommendations.
 */
function getFastContentSearchToolDescription(toolList) {
  // eV is assumed to be defined in the module'createInteractionAccessor scope (external dependency)
  // It represents the name of a specific tool (e.g., 'ripgrep')
  // If not defined, this function will throw a ReferenceError
  
  // Create a set of all tool names for efficient lookup
  const toolNamesSet = new Set(toolList.map(tool => tool.name));

  // Check if the special tool (eV) is present in the tool list
  const hasSpecialTool = toolNamesSet.has(eV);

  return `
- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\\\s+\\\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns${
    hasSpecialTool
      ? `
- If you need to identify/count the number of matches within files, use the ${eV} tool with \`rg\` (ripgrep) directly. normalizeToError NOT use \`grep\`.`
      : ""
  }
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
`;
}

module.exports = getFastContentSearchToolDescription;