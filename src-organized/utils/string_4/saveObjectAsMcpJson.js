/**
 * Saves the provided JavaScript object as a pretty-printed JSON file named ".mcp.json" in the current working directory.
 *
 * @param {Object} dataObject - The JavaScript object to be serialized and saved.
 * @returns {void}
 */
function saveObjectAsMcpJson(dataObject) {
  // Get the path to the .mcp.json file in the current working directory
  const mcpJsonFilePath = qy1(iA(), ".mcp.json");

  // Serialize the object to a pretty-printed JSON string
  const jsonString = JSON.stringify(dataObject, null, 2);

  // Write the JSON string to the file with UTF-8 encoding
  jM(mcpJsonFilePath, jsonString, {
    encoding: "utf8"
  });
}

module.exports = saveObjectAsMcpJson;