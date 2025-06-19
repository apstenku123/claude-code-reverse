/**
 * Parses an identifier string in the format 'mcp__serverName__toolName' and extracts the server and tool names.
 *
 * @param {string} identifier - The identifier string to parse, expected in the format 'mcp__serverName__toolName'.
 * @returns {{ serverName: string, toolName?: string } | null} An object containing the extracted serverName and optional toolName, or null if the format is invalid.
 */
function parseMcpIdentifier(identifier) {
  // Split the identifier by double underscores
  const parts = identifier.split("__");
  // Destructure the parts: prefix, serverName, and the rest as toolNameParts
  const [prefix, serverName, ...toolNameParts] = parts;

  // Validate that the identifier starts with 'mcp' and has a serverName
  if (prefix !== "mcp" || !serverName) {
    return null;
  }

  // If there are additional parts, join them as the toolName
  const toolName = toolNameParts.length > 0 ? toolNameParts.join("__") : undefined;

  return {
    serverName,
    toolName
  };
}

module.exports = parseMcpIdentifier;