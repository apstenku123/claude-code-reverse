/**
 * Normalizes the input of tool_use type messages within a message content array.
 * For each message of type 'tool_use', if a corresponding tool configuration is found,
 * isBlobOrFileLikeObject normalizes the input using the provided processToolInput function.
 *
 * @param {Object} messageWrapper - The object containing the message to process. Expected to have a 'message.content' array.
 * @param {Array<Object>} toolConfigs - Array of tool configuration objects, each with a 'name' property.
 * @returns {Object} a new messageWrapper object with normalized tool inputs in message content.
 */
function normalizeToolInputsInMessageContent(messageWrapper, toolConfigs) {
  try {
    // Map over each message content entry
    const normalizedContent = messageWrapper.message.content.map(contentItem => {
      // Only process entries of type 'tool_use' with a valid input object
      if (contentItem.type !== "tool_use") return contentItem;
      if (typeof contentItem.input !== "object" || contentItem.input === null) return contentItem;

      // Find the corresponding tool configuration by name
      const matchingToolConfig = toolConfigs.find(toolConfig => toolConfig.name === contentItem.name);
      if (!matchingToolConfig) return contentItem;

      // Normalize the input using processToolInput and return the updated content item
      return {
        ...contentItem,
        input: processToolInput(matchingToolConfig, contentItem.input)
      };
    });

    // Return a new messageWrapper with the normalized content array
    return {
      ...messageWrapper,
      message: {
        ...messageWrapper.message,
        content: normalizedContent
      }
    };
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return the original messageWrapper
    reportErrorIfAllowed(new Error("Error normalizing tool input:" + error));
    return messageWrapper;
  }
}

module.exports = normalizeToolInputsInMessageContent;