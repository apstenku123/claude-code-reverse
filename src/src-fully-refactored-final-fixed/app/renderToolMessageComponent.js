/**
 * Renders the appropriate React component for a tool-related message in the CLI app.
 *
 * Depending on the message content and error state, this function selects and renders
 * the correct component (e.g., progress, error, or standard tool message component).
 *
 * @param {Object} options - The options for rendering the tool message.
 * @param {Object} options.param - The tool message object containing details about the tool usage.
 * @param {Object} options.message - The original message object.
 * @param {Array} options.messages - The array of all messages.
 * @param {Object} options.progressMessagesForMessage - Progress messages associated with the current message.
 * @param {Object} options.style - Style object for rendering.
 * @param {Array} options.tools - List of available tools.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @param {number} options.width - The width for rendering the component.
 * @returns {React.ReactElement|null} The rendered React element for the tool message, or null if not applicable.
 */
function renderToolMessageComponent({
  param: toolMessage,
  message,
  messages,
  progressMessagesForMessage,
  style,
  tools,
  verbose,
  width
}) {
  // Find the tool usage details for the given tool_use_id
  const toolUsageDetails = lN2(toolMessage.tool_use_id, tools, messages);
  if (!toolUsageDetails) return null;

  // If the content is a special 'qO' value, render the renderUserInterruptedMessage component
  if (toolMessage.content === qO) {
    return processWithTransformedObservable$.createElement(renderUserInterruptedMessage, null);
  }

  // If the content is a special 'ce' or 'WW' value, render the renderToolUseRejectionMessage component with input and progress
  if (toolMessage.content === ce || toolMessage.content === WW) {
    return processWithTransformedObservable$.createElement(renderToolUseRejectionMessage, {
      input: toolUsageDetails.toolUse.input,
      progressMessagesForMessage,
      tool: toolUsageDetails.tool,
      tools,
      messages,
      style,
      verbose
    });
  }

  // If the message is marked as an error, render the error component
  if (toolMessage.is_error) {
    return processWithTransformedObservable$.createElement(renderToolMessageContent, {
      progressMessagesForMessage,
      tool: toolUsageDetails.tool,
      tools,
      param: toolMessage,
      verbose
    });
  }

  // Otherwise, render the standard tool message component
  return processWithTransformedObservable$.createElement(renderToolResultPanel, {
    message,
    progressMessagesForMessage,
    style,
    tool: toolUsageDetails.tool,
    tools,
    verbose,
    width
  });
}

module.exports = renderToolMessageComponent;