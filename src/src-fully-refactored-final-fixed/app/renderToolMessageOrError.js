/**
 * Renders a tool message or an error message based on the content and tool configuration.
 *
 * @param {Object} options - The options object containing all parameters.
 * @param {Array} options.progressMessagesForMessage - Progress messages related to the current message.
 * @param {Object} options.tool - The tool object, which may provide a custom error renderer.
 * @param {Array} options.tools - List of available tools.
 * @param {Object} options.param - The message parameter, expected to have a 'content' property.
 * @param {boolean} options.verbose - Flag to indicate verbose output.
 * @returns {React.Element} The rendered React element for the message or error.
 */
function renderToolMessageOrError({
  progressMessagesForMessage,
  tool,
  tools,
  param,
  verbose
}) {
  // If the message content is a string and starts with the special prefix, render a placeholder UI
  if (typeof param.content === "string" && param.content.startsWith(WW)) {
    return nj.createElement(ConditionalRowContainer, { height: 1 }, nj.createElement(renderUserInterruptedMessage, null));
  }

  // If no tool is provided, render the default result message component
  if (!tool) {
    return nj.createElement(renderErrorMessage, {
      result: param.content,
      verbose: verbose
    });
  }

  // Otherwise, use the tool'createInteractionAccessor custom error message renderer
  return tool.renderToolUseErrorMessage(param.content, {
    progressMessagesForMessage: progressMessagesForMessage,
    tools: tools,
    verbose: verbose
  });
}

module.exports = renderToolMessageOrError;