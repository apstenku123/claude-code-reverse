/**
 * Renders the result panel for a tool'createInteractionAccessor execution if a result is available and the tool is defined.
 *
 * @param {Object} params - The parameters for rendering the tool result panel.
 * @param {Object} params.message - The message object, expected to contain a 'toolUseResult' property.
 * @param {Array} params.progressMessagesForMessage - An array of progress messages related to the main message.
 * @param {Object} params.style - The style object to apply to the rendered panel.
 * @param {Object} params.tool - The tool instance, expected to have a 'renderToolResultMessage' method.
 * @param {Array} params.tools - An array of available tools, passed to the rendering method.
 * @param {boolean} params.verbose - Whether to render the result in verbose mode.
 * @param {number|string} params.width - The width to apply to the rendered panel.
 * @returns {React.ReactNode|null} The rendered tool result panel, or null if no result/tool is available.
 */
function renderToolResultPanel({
  message,
  progressMessagesForMessage,
  style,
  tool,
  tools,
  verbose,
  width
}) {
  // If there is no tool result or the tool instance is missing, render nothing
  if (!message.toolUseResult || !tool) return null;

  // Render the tool result panel using the tool'createInteractionAccessor rendering method
  return dt1.createElement(
    g, // Presumed to be a layout or container component
    {
      flexDirection: "column",
      width: width
    },
    tool.renderToolResultMessage(
      message.toolUseResult,
      progressMessagesForMessage,
      {
        style: style,
        tools: tools,
        verbose: verbose
      }
    )
  );
}

module.exports = renderToolResultPanel;