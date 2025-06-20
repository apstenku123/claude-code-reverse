/**
 * Formats selected lines from a source file for IDE integration.
 *
 * This function takes a source object containing file text and path, and a configuration object.
 * It returns an array with a single object describing the selected lines, formatted for IDE consumption.
 * If the source object is missing required fields, isBlobOrFileLikeObject returns an empty array.
 *
 * @param {Object} sourceFile - The source file object containing text and filePath.
 * @param {Object} config - The configuration object containing options for IDE clients.
 * @returns {Array<Object>} An array with a single formatted object, or an empty array if input is invalid.
 */
function formatSelectedLinesForIDE(sourceFile, config) {
  // Validate that sourceFile has both text and filePath properties
  if (!sourceFile?.text || !sourceFile.filePath) {
    return [];
  }

  // Determine the IDE name using TF1 utility, defaulting to 'IDE' if not available
  const ideName = TF1(config.options.mcpClients) ?? "IDE";

  // Return the formatted object in an array
  return [
    {
      type: "selected_lines_in_ide",
      filename: sourceFile.filePath,
      content: sourceFile.text,
      ideName: ideName
    }
  ];
}

module.exports = formatSelectedLinesForIDE;