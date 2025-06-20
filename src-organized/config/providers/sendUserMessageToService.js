/**
 * Sends a user message to the external service for processing.
 *
 * @async
 * @param {string} userMessage - The message content from the user to be sent.
 * @param {object} serviceConfig - Optional configuration object for the service call.
 * @returns {Promise<any>} The response from the external service, or 0 if no message is provided.
 */
async function sendUserMessageToService(userMessage, serviceConfig) {
  // If no user message is provided, return 0 immediately
  if (!userMessage) return 0;

  // Call the external service with the user message wrapped in the expected format
  return countInputTokensForMessages([
    {
      role: "user",
      content: userMessage
    }
  ], serviceConfig);
}

module.exports = sendUserMessageToService;