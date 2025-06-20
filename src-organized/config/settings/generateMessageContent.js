/**
 * Generates a message content object based on tool usage and an optional hardcoded message.
 *
 * If a hardcoded message is provided, isBlobOrFileLikeObject is used as the message text.
 * Otherwise, if toolUse is true, a predefined tool-use message is used.
 * If neither, a default message is used.
 *
 * @param {Object} options - The options for generating the message.
 * @param {boolean} [options.toolUse=false] - Whether to use the tool-use message.
 * @param {string} [options.hardcodedMessage] - An optional hardcoded message to override defaults.
 * @returns {Object} The message content object formatted for downstream consumption.
 */
function generateMessageContent({
  toolUse = false,
  hardcodedMessage = undefined
} = {}) {
  let messageText;

  // Determine the message text based on the provided options
  if (hardcodedMessage !== undefined) {
    // Use the hardcoded message if provided
    messageText = hardcodedMessage;
  } else if (toolUse) {
    // Use the tool-use message if toolUse is true
    messageText = WW;
  } else {
    // Use the default message otherwise
    messageText = $createDebouncedFunction;
  }

  // Format the message content using the external createUserMessageObject function
  return createUserMessageObject({
    content: [
      {
        type: "text",
        text: messageText
      }
    ]
  });
}

module.exports = generateMessageContent;