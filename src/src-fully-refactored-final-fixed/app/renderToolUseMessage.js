/**
 * Renders the appropriate React component for a tool use message based on its content and status.
 *
 * @param {Object} options - The options object containing all necessary data for rendering.
 * @param {Object} options.param - The tool use message object to render.
 * @param {Object} options.message - The original message object.
 * @param {Array} options.messages - The list of all messages.
 * @param {Object} options.progressMessagesForMessage - Progress messages associated with the message.
 * @param {Object} options.style - Style object for rendering.
 * @param {Array} options.tools - The list of available tools.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @param {number} options.width - The width for rendering the component.
 * @returns {React.Element|null} The rendered React element for the tool use message, or null if not applicable.
 */
function renderToolUseMessage({
  param: toolUseMessage,
  message: originalMessage,
  messages: allMessages,
  progressMessagesForMessage,
  style,
  tools,
  verbose,
  width
}) {
  // Find the tool use entry associated with this message
  const toolUseEntry = lN2(toolUseMessage.tool_use_id, tools, allMessages);
  if (!toolUseEntry) return null;

  // If the content is a special 'pending' value, render the pending component
  if (toolUseMessage.content === qO) {
    return processWithTransformedObservable$.createElement(renderUserInterruptedMessage, null);
  }

  // If the content is a 'cancelled' or 'waiting' value, render the appropriate component
  if (toolUseMessage.content === ce || toolUseMessage.content === WW) {
    return processWithTransformedObservable$.createElement(renderToolUseRejectionMessage, {
      input: toolUseEntry.toolUse.input,
      progressMessagesForMessage,
      tool: toolUseEntry.tool,
      tools,
      messages: allMessages,
      style,
      verbose
    });
  }

  // If the message indicates an error, render the error component
  if (toolUseMessage.is_error) {
    return processWithTransformedObservable$.createElement(renderToolMessageContent, {
      progressMessagesForMessage,
      tool: toolUseEntry.tool,
      tools,
      param: toolUseMessage,
      verbose
    });
  }

  // Otherwise, render the standard tool use message component
  return processWithTransformedObservable$.createElement(renderToolResultPanel, {
    message: originalMessage,
    progressMessagesForMessage,
    style,
    tool: toolUseEntry.tool,
    tools,
    verbose,
    width
  });
}

module.exports = renderToolUseMessage;