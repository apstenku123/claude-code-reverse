/**
 * Writes the provided configuration object to a .mcp.json file in the current working directory.
 *
 * @param {Object} configObject - The configuration object to be written to the .mcp.json file.
 * @returns {void}
 */
function writeMcpJsonConfig(configObject) {
  // Get the path to the .mcp.json file in the current working directory
  const mcpJsonFilePath = qy1(iA(), ".mcp.json");
  // Serialize the configuration object to a pretty-printed JSON string
  const jsonString = JSON.stringify(configObject, null, 2);
  // Write the JSON string to the file with UTF-8 encoding
  jM(mcpJsonFilePath, jsonString, {
    encoding: "utf8"
  });
}

module.exports = writeMcpJsonConfig;
