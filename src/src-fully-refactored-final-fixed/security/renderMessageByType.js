/**
 * Renders a message component based on the message type.
 * Handles 'attachment', 'assistant', 'user', and 'system' message types,
 * and passes the appropriate props to each respective component.
 *
 * @param {Object} params - The parameters for rendering the message.
 * @param {Object} params.message - The message object to render.
 * @param {Array} params.messages - The list of all messages (used for user messages).
 * @param {boolean} params.addMargin - Whether to add margin to the rendered component.
 * @param {Array} params.tools - The list of available tools.
 * @param {boolean} params.verbose - Whether to render in verbose mode.
 * @param {Array} params.erroredToolUseIDs - IDs of tool uses that errored.
 * @param {Array} params.inProgressToolUseIDs - IDs of tool uses in progress.
 * @param {Array} params.unresolvedToolUseIDs - IDs of unresolved tool uses.
 * @param {Object} params.progressMessagesForMessage - Progress messages mapped by message.
 * @param {boolean} params.shouldAnimate - Whether to animate the rendering.
 * @param {boolean} params.shouldShowDot - Whether to show a dot indicator.
 * @param {Object} params.style - Additional style to apply.
 * @param {string|number} params.width - The width to apply to the rendered component.
 * @returns {React.Element|null} The rendered React element for the message, or null if type is unknown.
 */
function renderMessageByType({
  message,
  messages,
  addMargin,
  tools,
  verbose,
  erroredToolUseIDs,
  inProgressToolUseIDs,
  unresolvedToolUseIDs,
  progressMessagesForMessage,
  shouldAnimate,
  shouldShowDot,
  style,
  width
}) {
  switch (message.type) {
    case "attachment":
      // Render attachment message component
      return NB.createElement(streamAsyncIterableToWritable$2, {
        addMargin,
        attachment: message.attachment,
        verbose
      });
    case "assistant":
      // Render assistant message component for each content entry
      return NB.createElement(
        g,
        {
          flexDirection: "column",
          width: "100%"
        },
        message.message.content.map((contentParam, contentIndex) =>
          NB.createElement(renderMessageByType, {
            key: contentIndex,
            param: contentParam,
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
          })
        )
      );
    case "user":
      // Render user message component for each content entry
      return NB.createElement(
        g,
        {
          flexDirection: "column",
          width: "100%"
        },
        message.message.content.map((contentParam, contentIndex) =>
          NB.createElement(getSubscriptionLevelAndTrackUsage, {
            key: contentIndex,
            message,
            messages,
            addMargin,
            tools,
            progressMessagesForMessage,
            param: contentParam,
            style,
            verbose
          })
        )
      );
    case "system":
      // Render system message component
      return NB.createElement(WarningMessageBox, {
        message,
        addMargin
      });
    default:
      // Unknown message type
      return null;
  }
}

module.exports = renderMessageByType;