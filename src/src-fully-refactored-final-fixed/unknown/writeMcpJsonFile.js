/**
 * Writes the provided data object to a .mcp.json file in the current working directory.
 *
 * @param {Object} data - The data object to serialize and write to the .mcp.json file.
 * @returns {void}
 */
function writeMcpJsonFile(data) {
  // Get the full path to the .mcp.json file in the current working directory
  const mcpJsonFilePath = qy1(iA(), ".mcp.json");

  // Serialize the data object to pretty-printed JSON (2-space indentation)
  const jsonString = JSON.stringify(data, null, 2);

  // Write the JSON string to the file with UTF-8 encoding
  jM(mcpJsonFilePath, jsonString, {
    encoding: "utf8"
  });
}

module.exports = writeMcpJsonFile;