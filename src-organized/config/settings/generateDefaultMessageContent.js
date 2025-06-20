/**
 * Generates a message content object based on tool usage and an optional hardcoded message.
 *
 * @param {Object} options - The options for generating the message.
 * @param {boolean} [options.toolUse=false] - Indicates if the tool is being used.
 * @param {string} [options.hardcodedMessage] - An optional hardcoded message to override defaults.
 * @returns {Object} An object containing the message content in the expected format.
 */
function generateDefaultMessageContent({
  toolUse = false,
  hardcodedMessage = undefined
}) {
  let messageText;

  // If a hardcoded message is provided, use isBlobOrFileLikeObject
  if (hardcodedMessage !== undefined) {
    messageText = hardcodedMessage;
  } else if (toolUse) {
    // If toolUse is true, use the WW constant (external)
    messageText = WW;
  } else {
    // Otherwise, use the $createDebouncedFunction constant (external)
    messageText = $createDebouncedFunction;
  }

  // Return the formatted message content using the createUserMessageObject function (external)
  return createUserMessageObject({
    content: [
      {
        type: "text",
        text: messageText
      }
    ]
  });
}

module.exports = generateDefaultMessageContent;