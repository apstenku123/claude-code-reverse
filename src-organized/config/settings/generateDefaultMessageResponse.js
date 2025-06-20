/**
 * Generates a default message response object based on tool usage and an optional hardcoded message.
 *
 * @param {Object} options - The options for generating the message response.
 * @param {boolean} [options.toolUse=false] - Indicates whether a tool is being used.
 * @param {string|undefined} [options.hardcodedMessage=undefined] - An optional hardcoded message to use as the response.
 * @returns {Object} The formatted message response object.
 */
function generateDefaultMessageResponse({
  toolUse = false,
  hardcodedMessage = undefined
}) {
  let messageText;

  // If a hardcoded message is provided, use isBlobOrFileLikeObject
  if (hardcodedMessage !== undefined) {
    messageText = hardcodedMessage;
  } else if (toolUse) {
    // If toolUse is true and no hardcoded message, use the WW constant
    messageText = WW;
  } else {
    // Otherwise, use the $createDebouncedFunction constant
    messageText = $createDebouncedFunction;
  }

  // Return the message wrapped in the expected format
  return createUserMessageObject({
    content: [
      {
        type: "text",
        text: messageText
      }
    ]
  });
}

module.exports = generateDefaultMessageResponse;