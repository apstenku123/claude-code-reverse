/**
 * Returns an array containing information about selected lines in an IDE, based on the provided source and configuration.
 *
 * @param {Object} source - The source object containing text and filePath properties.
 * @param {Object} config - The configuration object containing options, including mcpClients.
 * @returns {Array<Object>} An array with a single object describing the selected lines in the IDE, or an empty array if input is invalid.
 */
function getSelectedLinesInIDE(source, config) {
  // Validate that source has both text and filePath properties
  if (!source?.text || !source.filePath) {
    return [];
  }

  // Determine the IDE name using TF1 and fallback to 'IDE' if undefined
  const ideName = TF1(config.options.mcpClients) ?? "IDE";

  // Return the selected lines information in the expected format
  return [{
    type: "selected_lines_in_ide",
    filename: source.filePath,
    content: source.text,
    ideName: ideName
  }];
}

module.exports = getSelectedLinesInIDE;