/**
 * Parses a string to extract a tool name and its rule content if present.
 *
 * The expected format is: "toolName(ruleContent)". If the input does not match this pattern,
 * the function returns an object with only the toolName property set to the original input.
 *
 * @param {string} toolString - The string to parse, expected in the format "toolName(ruleContent)".
 * @returns {{ toolName: string, ruleContent?: string }}
 *   An object containing the extracted toolName, and ruleContent if present.
 */
function parseToolNameAndRuleContent(toolString) {
  // Attempt to match the pattern: toolName(ruleContent)
  const matchResult = toolString.match(/^([^(]+)\(([^)]+)\)$/);

  // If the pattern does not match, return the original string as toolName
  if (!matchResult) {
    return {
      toolName: toolString
    };
  }

  const toolName = matchResult[1];
  const ruleContent = matchResult[2];

  // If either toolName or ruleContent is missing, return the original string as toolName
  if (!toolName || !ruleContent) {
    return {
      toolName: toolString
    };
  }

  // Return both toolName and ruleContent if successfully extracted
  return {
    toolName,
    ruleContent
  };
}

module.exports = parseToolNameAndRuleContent;