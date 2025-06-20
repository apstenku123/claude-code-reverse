/**
 * Parses a specially formatted string to extract the server name and optional tool name.
 *
 * The input string is expected to be in the format:
 *   'mcp__<serverName>__<toolName>'
 * If the prefix is not 'mcp' or the server name is missing, returns null.
 *
 * @param {string} input - The string to parse, expected to be in the format 'mcp__serverName__toolName'.
 * @returns {{serverName: string, toolName?: string} | null} An object with serverName and optional toolName, or null if input is invalid.
 */
function parseMcpServerAndToolName(input) {
  // Split the input string by double underscores
  const parts = input.split("__");
  // Destructure the parts into prefix, serverName, and the rest as toolNameParts
  const [prefix, serverName, ...toolNameParts] = parts;

  // Validate that the prefix is 'mcp' and serverName exists
  if (prefix !== "mcp" || !serverName) {
    return null;
  }

  // If there are additional parts, join them back as the toolName
  const toolName = toolNameParts.length > 0 ? toolNameParts.join("__") : undefined;

  return {
    serverName,
    toolName
  };
}

module.exports = parseMcpServerAndToolName;
