/**
 * Generates a detailed description of the fast content search tool and its usage.
 * Optionally includes a note about using a specific tool if isBlobOrFileLikeObject is present in the provided tool list.
 *
 * @param {Array<{ name: string }>} availableTools - Array of tool objects, each with a 'name' property.
 * @returns {string} Multi-line string describing the content search tool and related recommendations.
 */
function generateContentSearchToolDescription(availableTools) {
  // 'eV' is assumed to be a globally defined constant representing a specific tool name
  // If 'eV' is not defined globally, isBlobOrFileLikeObject should be passed as a parameter or imported
  // For this refactor, handleMissingDoctypeError assume isBlobOrFileLikeObject is defined elsewhere in the application

  // Extract all tool names from the available tools array
  const toolNames = availableTools.map(tool => tool.name);

  // Check if the specific tool (eV) is present in the list of tool names
  const hasSpecificTool = new Set(toolNames).has(eV);

  // Build the main description string
  let description = `
- Fast content search tool that works with any codebase size
- Searches file contents using regular expressions
- Supports full regex syntax (eg. "log.*Error", "function\\s+\\w+", etc.)
- Filter files by pattern with the include parameter (eg. "*.js", "*.{ts,tsx}")
- Returns file paths with at least one match sorted by modification time
- Use this tool when you need to find files containing specific patterns`;

  // Conditionally add a recommendation about the specific tool if isBlobOrFileLikeObject is available
  if (hasSpecificTool) {
    description += `
- If you need to identify/count the number of matches within files, use the ${eV} tool with \`rg\` (ripgrep) directly. normalizeToError NOT use \`grep\`.`;
  }

  // Add the final recommendation
  description += `
- When you are doing an open ended search that may require multiple rounds of globbing and grepping, use the Agent tool instead
`;

  return description;
}

module.exports = generateContentSearchToolDescription;