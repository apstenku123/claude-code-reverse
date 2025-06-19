/**
 * Counts the number of input tokens for a given array of chat messages using a specified model.
 *
 * @async
 * @function countInputTokensForMessages
 * @param {Array<Object>} messages - An array of message objects to be tokenized.
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive (affects model initialization).
 * @returns {Promise<number|null>} The number of input tokens for the provided messages, or null if an error occurs.
 *
 * @throws Will return null if an error occurs during token counting.
 */
async function countInputTokensForMessages(messages, isNonInteractiveSession) {
  try {
    // Return 0 if there are no messages to process
    if (!messages || messages.length === 0) return 0;

    // Retrieve the current model identifier
    const modelName = getProcessedInteractionRoute();

    // Initialize the model session with specified options
    const modelSession = await NK({
      maxRetries: 1,
      model: modelName,
      isNonInteractiveSession: isNonInteractiveSession
    });

    // Retrieve any beta features associated with the model
    const betaFeatures = TY(modelName);

    // Prepare the payload for counting tokens
    const countTokensPayload = {
      model: modelName,
      messages: messages,
      // Include beta features only if available
      ...(betaFeatures.length > 0 ? { betas: betaFeatures } : {})
    };

    // Call the countTokens API and extract the input token count
    const tokenCountResult = await modelSession.beta.messages.countTokens(countTokensPayload);
    return tokenCountResult.input_tokens;
  } catch (error) {
    // Handle errors and return null
    reportErrorIfAllowed(error);
    return null;
  }
}

module.exports = countInputTokensForMessages;