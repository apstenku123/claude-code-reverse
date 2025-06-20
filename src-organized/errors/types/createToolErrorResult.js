/**
 * Creates a standardized error result object for a tool operation.
 *
 * @param {string} toolUseId - The unique identifier for the tool usage instance.
 * @returns {Object} An object representing the error result of a tool operation.
 */
function createToolErrorResult(toolUseId) {
  // qO is assumed to be an external variable representing error content/message
  return {
    type: "tool_result", // Indicates this is a tool result object
    content: qO,         // Error content/message (external dependency)
    is_error: true,      // Marks this result as an error
    tool_use_id: toolUseId // The unique updateSnapshotAndNotify for this tool usage
  };
}

module.exports = createToolErrorResult;