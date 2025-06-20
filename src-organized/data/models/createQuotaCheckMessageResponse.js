/**
 * Sends a 'quota' message as a user to the beta messages API and returns the response.
 *
 * This function retrieves the current model, prepares a non-interactive session configuration,
 * constructs a user message with the content 'quota', and optionally includes beta features
 * if available. It then sends the message and returns the API response.
 *
 * @async
 * @returns {Promise<any>} The response from the beta messages API after sending the 'quota' message.
 */
async function createQuotaCheckMessageResponse() {
  // Retrieve the current model identifier
  const modelId = _S();

  // Prepare the session configuration for the beta messages API
  const betaSessionConfig = await NK({
    maxRetries: 0,
    model: modelId,
    isNonInteractiveSession: false
  });

  // Construct the user message to check quota
  const userMessages = [
    {
      role: "user",
      content: "quota"
    }
  ];

  // Retrieve any beta features enabled for this model
  const betaFeatures = TY(modelId);

  // Send the message using the beta messages API and return the response
  return betaSessionConfig.beta.messages.create({
    model: modelId,
    max_tokens: 1,
    messages: userMessages,
    metadata: A11(),
    // Include beta features only if any are present
    ...(betaFeatures.length > 0 ? { betas: betaFeatures } : {})
  }).asResponse();
}

module.exports = createQuotaCheckMessageResponse;