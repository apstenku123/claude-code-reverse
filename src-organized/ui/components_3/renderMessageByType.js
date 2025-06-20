/**
 * Renders a message component based on the message type.
 *
 * @param {Object} options - The options object containing message data and rendering options.
 * @param {Object} options.message - The message object to render. Must have a 'type' property.
 * @param {boolean} options.addMargin - Whether to add margin to the rendered component.
 * @param {Array} options.tools - List of available tools for tool_use messages.
 * @param {boolean} options.verbose - Whether to render in verbose mode.
 * @param {Array} options.erroredToolUseIDs - IDs of tool uses that errored.
 * @param {Array} options.inProgressToolUseIDs - IDs of tool uses that are in progress.
 * @param {Array} options.unresolvedToolUseIDs - IDs of tool uses that are unresolved.
 * @param {Object} options.progressMessagesForMessage - Progress messages associated with the message.
 * @param {boolean} options.shouldAnimate - Whether to animate the rendered component.
 * @param {boolean} options.shouldShowDot - Whether to show a dot indicator.
 * @param {number} options.width - Width for text messages.
 * @returns {React.Element|null} The rendered React element for the message, or null if the type is unknown.
 */
function renderMessageByType({
  message,
  addMargin,
  tools,
  verbose,
  erroredToolUseIDs,
  inProgressToolUseIDs,
  unresolvedToolUseIDs,
  progressMessagesForMessage,
  shouldAnimate,
  shouldShowDot,
  width
}) {
  switch (message.type) {
    case "tool_use":
      // Render a tool use message component
      return NB.createElement(renderToolUsageRow, {
        param: message,
        addMargin,
        tools,
        verbose,
        erroredToolUseIDs,
        inProgressToolUseIDs,
        unresolvedToolUseIDs,
        progressMessagesForMessage,
        shouldAnimate,
        shouldShowDot
      });
    case "text":
      // Render a text message component
      return NB.createElement(a$2, {
        param: message,
        addMargin,
        shouldShowDot,
        width
      });
    case "redacted_thinking":
      // Render a redacted thinking message component
      return NB.createElement(ThinkingIndicator, {
        addMargin
      });
    case "thinking":
      // Render a thinking message component
      return NB.createElement(processCssDeclarations$2, {
        addMargin,
        param: message
      });
    default:
      // Log error and return null if the message type is unknown
      reportErrorIfAllowed(new Error(`Unable to render message type: ${message.type}`));
      return null;
  }
}

module.exports = renderMessageByType;