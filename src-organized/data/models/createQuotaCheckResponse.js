/**
 * Checks the quota status by sending a 'quota' message to the beta messages API.
 *
 * This function retrieves the current model, prepares a non-interactive session configuration,
 * and sends a 'quota' message as a user to the beta messages API. It includes any beta features
 * if available and attaches relevant metadata. The function returns the API'createInteractionAccessor response.
 *
 * @async
 * @returns {Promise<any>} The response from the beta messages API regarding quota status.
 */
async function createQuotaCheckResponse() {
  // Retrieve the current model identifier
  const modelId = _S();

  // Prepare the configuration for the beta API session
  const betaApiConfig = await NK({
    maxRetries: 0,
    model: modelId,
    isNonInteractiveSession: false
  });

  // Prepare the message payload to check quota
  const quotaCheckMessage = [{
    role: "user",
    content: "quota"
  }];

  // Retrieve any beta features for the current model
  const betaFeatures = TY(modelId);

  // Send the quota check message to the beta messages API
  return betaApiConfig.beta.messages.create({
    model: modelId,
    max_tokens: 1,
    messages: quotaCheckMessage,
    metadata: A11(),
    // Include beta features if any are present
    ...(betaFeatures.length > 0 ? { betas: betaFeatures } : {})
  }).asResponse();
}

module.exports = createQuotaCheckResponse;
