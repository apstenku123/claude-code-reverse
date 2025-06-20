/**
 * Renders the appropriate terminal message component based on the message type.
 *
 * @param {Object} props - The properties for rendering the message component.
 * @param {Object} props.message - The current message object to render.
 * @param {Array} props.messages - The list of all messages.
 * @param {boolean} props.addMargin - Whether to add margin to the rendered component.
 * @param {Array} props.tools - The list of available tools.
 * @param {Function} props.progressMessagesForMessage - Function to get progress messages for a given message.
 * @param {Object} props.param - The message parameter object, must include a 'type' property.
 * @param {Object} props.style - Optional style object for the component.
 * @param {boolean} props.verbose - Whether to render in verbose mode.
 * @returns {React.Element|undefined} The rendered React element for the message, or undefined if type is unrecognized.
 */
function renderTerminalMessageComponent({
  message,
  messages,
  addMargin,
  tools,
  progressMessagesForMessage,
  param,
  style,
  verbose
}) {
  // Get the current terminal dimensions
  const { columns: terminalWidth } = useTerminalDimensions();

  // Render component based on the message type
  switch (param.type) {
    case "text":
      // Render a plain text message component
      return NB.createElement(AH1, {
        addMargin,
        param,
        verbose
      });
    case "tool_result":
      // Render a tool result message component, adjusting width for terminal size
      return NB.createElement(renderToolUseMessage, {
        param,
        message,
        messages,
        progressMessagesForMessage,
        style,
        tools,
        verbose,
        width: terminalWidth - 5 // Subtract 5 for padding or UI elements
      });
    default:
      // If the message type is unrecognized, render nothing
      return;
  }
}

module.exports = renderTerminalMessageComponent;