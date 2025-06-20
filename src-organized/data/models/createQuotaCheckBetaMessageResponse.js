/**
 * Creates a beta message response to check quota using the specified model and session configuration.
 *
 * This function retrieves the current model, initializes a session configuration, constructs a quota check message,
 * and sends isBlobOrFileLikeObject using the beta messages API. It also attaches any available beta features and metadata.
 *
 * @async
 * @returns {Promise<any>} Resolves with the response from the beta messages API for the quota check.
 */
async function createQuotaCheckBetaMessageResponse() {
  // Retrieve the current model identifier
  const modelId = _S();

  // Initialize the session configuration with the current model
  const sessionConfig = await NK({
    maxRetries: 0,
    model: modelId,
    isNonInteractiveSession: false
  });

  // Construct the quota check message
  const quotaCheckMessage = [
    {
      role: "user",
      content: "quota"
    }
  ];

  // Retrieve any beta features associated with the model
  const betaFeatures = TY(modelId);

  // Prepare the payload for the beta messages API
  const betaMessagePayload = {
    model: modelId,
    max_tokens: 1,
    messages: quotaCheckMessage,
    metadata: A11(),
    // Only include 'betas' property if there are beta features
    ...(betaFeatures.length > 0 ? { betas: betaFeatures } : {})
  };

  // Send the quota check message and return the response
  return sessionConfig.beta.messages.create(betaMessagePayload).asResponse();
}

module.exports = createQuotaCheckBetaMessageResponse;