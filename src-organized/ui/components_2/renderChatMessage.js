/**
 * Renders a chat message component based on its type (attachment, assistant, user, or system).
 * Handles rendering of message content, attachments, and associated UI states such as tool usage progress and errors.
 *
 * @param {Object} params - The parameters for rendering the chat message.
 * @param {Object} params.message - The message object to render. Should include a 'type' property.
 * @param {Array} params.messages - The full list of messages in the conversation.
 * @param {boolean} params.addMargin - Whether to add margin to the rendered component.
 * @param {Array} params.tools - List of available tools for tool-using messages.
 * @param {boolean} params.verbose - Whether to render in verbose mode.
 * @param {Array} params.erroredToolUseIDs - List of tool use IDs that have errored.
 * @param {Array} params.inProgressToolUseIDs - List of tool use IDs that are in progress.
 * @param {Array} params.unresolvedToolUseIDs - List of tool use IDs that are unresolved.
 * @param {Object} params.progressMessagesForMessage - Progress messages mapped by message.
 * @param {boolean} params.shouldAnimate - Whether to animate the message rendering.
 * @param {boolean} params.shouldShowDot - Whether to show a dot indicator.
 * @param {Object} params.style - Additional style to apply to the message.
 * @param {string|number} params.width - Width of the rendered message component.
 * @returns {React.ReactElement|null} The rendered chat message React element, or null if type is unrecognized.
 */
function renderChatMessage({
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
      // Render an attachment message using the streamAsyncIterableToWritable$2 component
      return NB.createElement(streamAsyncIterableToWritable$2, {
        addMargin,
        attachment: message.attachment,
        verbose
      });
    case "assistant":
      // Render assistant message content, which may be an array of parameters
      return NB.createElement(
        g,
        {
          flexDirection: "column",
          width: "100%"
        },
        message.message.content.map((contentParam, index) =>
          NB.createElement(renderMessageByType, {
            key: index,
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
      // Render user message content, which may be an array of parameters
      return NB.createElement(
        g,
        {
          flexDirection: "column",
          width: "100%"
        },
        message.message.content.map((contentParam, index) =>
          NB.createElement(getSubscriptionLevelAndTrackUsage, {
            key: index,
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
      // Render a system message using the WarningMessageBox component
      return NB.createElement(WarningMessageBox, {
        message,
        addMargin
      });
    default:
      // If message type is unrecognized, return null
      return null;
  }
}

module.exports = renderChatMessage;