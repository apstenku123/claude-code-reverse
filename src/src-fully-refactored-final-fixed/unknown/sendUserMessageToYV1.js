/**
 * Sends a user message to the countInputTokensForMessages handler if a message is provided.
 *
 * @async
 * @param {string} userMessage - The message content from the user to be sent.
 * @param {object} [options] - Optional configuration object passed to countInputTokensForMessages.
 * @returns {Promise<any>|number} Returns the result of countInputTokensForMessages if userMessage is provided, otherwise returns 0.
 */
async function sendUserMessageToYV1(userMessage, options) {
  // If no user message is provided, return 0 immediately
  if (!userMessage) return 0;

  // Prepare the message payload for countInputTokensForMessages
  const messagePayload = [
    {
      role: "user",
      content: userMessage
    }
  ];

  // Forward the message payload and options to countInputTokensForMessages
  return countInputTokensForMessages(messagePayload, options);
}

module.exports = sendUserMessageToYV1;