/**
 * Renders the appropriate message component based on the message type.
 *
 * Depending on the type of the provided message parameter, this function will render either a text message component
 * or a tool result component, passing along all relevant props. It also adapts the width of the tool result component
 * based on the current terminal window size.
 *
 * @param {Object} options - The options for rendering the message component.
 * @param {Object} options.message - The current message object to render.
 * @param {Array<Object>} options.messages - The list of all messages.
 * @param {boolean} options.addMargin - Whether to add margin to the rendered component.
 * @param {Array<Object>} options.tools - The list of available tools.
 * @param {Function} options.progressMessagesForMessage - Function to get progress messages for a given message.
 * @param {Object} options.param - The message parameter object, must include a 'type' property.
 * @param {Object} [options.style] - Optional style object to apply to the component.
 * @param {boolean} [options.verbose] - Whether to render in verbose mode.
 * @returns {React.ReactElement|undefined} The rendered React element for the message, or undefined if the type is unrecognized.
 */
function renderMessageComponent({
  message,
  messages,
  addMargin,
  tools,
  progressMessagesForMessage,
  param,
  style,
  verbose
}) {
  // Get the current terminal window size using a custom React hook
  const { columns: terminalColumns } = useTerminalWindowSize();

  switch (param.type) {
    case "text":
      // Render a text message component
      return NB.createElement(AH1, {
        addMargin,
        param,
        verbose
      });
    case "tool_result":
      // Render a tool result component, adjusting width for terminal size
      return NB.createElement(renderToolUseMessage, {
        param,
        message,
        messages,
        progressMessagesForMessage,
        style,
        tools,
        verbose,
        width: terminalColumns - 5 // Subtract 5 for padding or layout
      });
    default:
      // Return undefined for unrecognized message types
      return;
  }
}

module.exports = renderMessageComponent;