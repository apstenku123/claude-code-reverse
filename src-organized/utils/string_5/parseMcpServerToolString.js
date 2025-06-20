/**
 * Parses a specially formatted string to extract the server name and tool name.
 *
 * The expected format is: 'mcp__<serverName>[__<toolName>]', where <toolName> is optional.
 *
 * @param {string} inputString - The string to parse, expected to follow the 'mcp__serverName[__toolName]' format.
 * @returns {{ serverName: string, toolName?: string } | null} An object containing the extracted serverName and (optionally) toolName, or null if the input does not match the expected format.
 */
function parseMcpServerToolString(inputString) {
  // Split the input string by double underscores
  const parts = inputString.split("__");
  // Destructure the parts into their respective components
  const [prefix, serverName, ...toolNameParts] = parts;

  // Validate that the prefix is 'mcp' and serverName exists
  if (prefix !== "mcp" || !serverName) {
    return null;
  }

  // If there are additional parts, join them back together as the tool name
  const toolName = toolNameParts.length > 0 ? toolNameParts.join("__") : undefined;

  return {
    serverName,
    toolName
  };
}

module.exports = parseMcpServerToolString;