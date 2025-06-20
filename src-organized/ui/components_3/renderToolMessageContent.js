/**
 * Renders the appropriate UI element or error message for a tool message content.
 *
 * @param {Object} options - The options for rendering the tool message content.
 * @param {Array} options.progressMessagesForMessage - Progress messages associated with the current message.
 * @param {Object} options.tool - The tool object, which may provide a custom error renderer.
 * @param {Array} options.tools - List of all available tools.
 * @param {Object} options.param - The message parameter object, expected to have a 'content' property.
 * @param {boolean} options.verbose - Flag indicating whether to render in verbose mode.
 * @returns {React.ReactElement} The rendered UI element or error message.
 */
function renderToolMessageContent({
  progressMessagesForMessage,
  tool,
  tools,
  param,
  verbose
}) {
  // If the message content is a string and starts with the special prefix, render a loading indicator
  if (typeof param.content === "string" && param.content.startsWith(WW)) {
    return nj.createElement(ConditionalRowContainer, { height: 1 }, nj.createElement(renderUserInterruptedMessage, null));
  }

  // If no tool is provided, render the default result component
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

module.exports = renderToolMessageContent;