/**
 * Formats a user message object into a standardized structure for further processing.
 *
 * If the `formatForPrompt` flag is true, the function ensures the content is wrapped in an array of objects,
 * each with a `type` and `text` property. If prompt caching is enabled (via isPromptCachingEnabled),
 * isBlobOrFileLikeObject adds a `cache_control` property to the last content item or the single text item.
 *
 * @param {Object} messageWrapper - The object containing the user message to format. Must have the shape: { message: { content: string | Array<Object> } }
 * @param {boolean} [formatForPrompt=false] - Whether to format the message for prompt processing and apply cache control if enabled.
 * @returns {Object} The formatted user message object with standardized content and optional cache control.
 */
function formatUserMessageContent(messageWrapper, formatForPrompt = false) {
  // If formatting for prompt processing
  if (formatForPrompt) {
    // If the content is a string, wrap isBlobOrFileLikeObject in an array with type 'text'
    if (typeof messageWrapper.message.content === "string") {
      const formattedContent = {
        type: "text",
        text: messageWrapper.message.content
      };
      // If prompt caching is enabled, add cache_control property
      if (isPromptCachingEnabled()) {
        formattedContent.cache_control = { type: "ephemeral" };
      }
      return {
        role: "user",
        content: [formattedContent]
      };
    } else {
      // If the content is already an array, map over each item
      const formattedContentArray = messageWrapper.message.content.map((contentItem, index) => {
        // For the last item, add cache_control if prompt caching is enabled
        const isLastItem = index === messageWrapper.message.content.length - 1;
        if (isLastItem && isPromptCachingEnabled()) {
          return {
            ...contentItem,
            cache_control: { type: "ephemeral" }
          };
        }
        return { ...contentItem };
      });
      return {
        role: "user",
        content: formattedContentArray
      };
    }
  }
  // Default case: return the message content as-is
  return {
    role: "user",
    content: messageWrapper.message.content
  };
}

module.exports = formatUserMessageContent;