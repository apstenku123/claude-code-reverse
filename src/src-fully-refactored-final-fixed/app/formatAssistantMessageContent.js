/**
 * Formats the assistant'createInteractionAccessor message content for response, optionally wrapping isBlobOrFileLikeObject for caching control.
 *
 * @param {Object} messageWrapper - The object containing the assistant'createInteractionAccessor message. Expected to have the shape: { message: { content: string | Array<Object> } }
 * @param {boolean} [wrapForCaching=false] - If true, wraps the content for caching control based on environment configuration.
 * @returns {Object} An object with the assistant'createInteractionAccessor role and formatted content, possibly including cache control metadata.
 */
function formatAssistantMessageContent(messageWrapper, wrapForCaching = false) {
  // If wrapForCaching is true, handle content wrapping and cache control
  if (wrapForCaching) {
    const { content } = messageWrapper.message;

    // If content is a string, wrap isBlobOrFileLikeObject in an array with type 'text'
    if (typeof content === "string") {
      return {
        role: "assistant",
        content: [
          {
            type: "text",
            text: content,
            // If prompt caching is enabled, add ephemeral cache control
            ...(isPromptCachingEnabled() ? {
              cache_control: {
                type: "ephemeral"
              }
            } : {})
          }
        ]
      };
    } else {
      // If content is an array, map each item, adding cache control to the last non-thinking entry
      return {
        role: "assistant",
        content: content.map((contentItem, index) => ({
          ...contentItem,
          // Only add cache control to the last item if isBlobOrFileLikeObject'createInteractionAccessor not a 'thinking' or 'redacted_thinking' type
          ...(
            index === content.length - 1 &&
            contentItem.type !== "thinking" &&
            contentItem.type !== "redacted_thinking" &&
            isPromptCachingEnabled()
              ? {
                  cache_control: {
                    type: "ephemeral"
                  }
                }
              : {}
          )
        }))
      };
    }
  }

  // Default: return the content as-is with the assistant role
  return {
    role: "assistant",
    content: messageWrapper.message.content
  };
}

module.exports = formatAssistantMessageContent;