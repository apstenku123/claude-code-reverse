/**
 * Retrieves the path from a tool object using its getPath method, if available.
 *
 * @param {Object} options - The options object containing the tool and input.
 * @param {Object} options.tool - The tool object that may provide a getPath method.
 * @param {any} options.input - The input to be passed to the tool'createInteractionAccessor getPath method.
 * @returns {any|null} The result of tool.getPath(input) if available and successful, otherwise null.
 */
function getInputPathFromTool(options) {
  const { tool, input } = options;

  // Check if the tool object has a getPath method
  if (tool && typeof tool.getPath === "function") {
    try {
      // Attempt to retrieve the path using the tool'createInteractionAccessor getPath method
      return tool.getPath(input);
    } catch (error) {
      // If an error occurs during getPath, return null
      return null;
    }
  }

  // If getPath is not a function on tool, return null
  return null;
}

module.exports = getInputPathFromTool;