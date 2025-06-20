/**
 * Sends a user message to the countInputTokensForMessages handler if the message content exists.
 *
 * @async
 * @function sendUserMessage
 * @param {string} messageContent - The content of the user message to send.
 * @param {object} handlerConfig - Configuration options for the countInputTokensForMessages handler.
 * @returns {Promise<any>|number} Returns 0 if messageContent is falsy, otherwise returns the result of countInputTokensForMessages.
 */
async function sendUserMessage(messageContent, handlerConfig) {
  // If there is no message content, return 0 immediately
  if (!messageContent) return 0;

  // Send the message as a user role to the countInputTokensForMessages handler
  return countInputTokensForMessages([
    {
      role: "user",
      content: messageContent
    }
  ], handlerConfig);
}

module.exports = sendUserMessage;