/**
 * Validates the provided API key by sending a test message to the model API.
 * If the session is non-interactive, returns true immediately.
 * Handles authentication errors and retries as needed.
 *
 * @param {string} apiKey - The API key to validate.
 * @param {boolean} isNonInteractiveSession - If true, skips validation and returns true.
 * @returns {Promise<boolean>} - Resolves to true if the API key is valid, false if invalid, or throws for other errors.
 */
async function validateApiKeyWithTestMessage(apiKey, isNonInteractiveSession) {
  if (isNonInteractiveSession) {
    // If the session is non-interactive, skip validation
    return true;
  }
  try {
    // Get the default model and any beta feature flags
    const modelName = _S();
    const betaFlags = TY(modelName);

    // Attempt to send a test message using the provided API key
    await retryWithTokenRefreshAndContextAdjustment(
      () => NK({
        apiKey: apiKey,
        maxRetries: 3,
        model: modelName,
        isNonInteractiveSession: isNonInteractiveSession
      }),
      async (client) => {
        // Prepare a minimal test message
        const testMessages = [
          {
            role: "user",
            content: "test"
          }
        ];
        // Send the test message and await the response
        await client.beta.messages.create({
          model: modelName,
          max_tokens: 1,
          messages: testMessages,
          temperature: 0,
          ...(betaFlags.length > 0 ? { betas: betaFlags } : {}),
          metadata: A11(),
          ...buildAnthropicConfigWithExtraBody()
        });
        return true;
      },
      {
        maxRetries: 2,
        showErrors: false,
        model: modelName
      }
    );
    return true;
  } catch (error) {
    let actualError = error;
    // If the error is a TO instance, extract the original error
    if (error instanceof TO) {
      actualError = error.originalError;
    }
    // Log the error for debugging
    reportErrorIfAllowed(actualError);
    // Check for specific authentication error message
    if (
      actualError instanceof Error &&
      actualError.message.includes(
        '{"type":"error","error":{"type":"authentication_error","message":"invalid x-api-key"}}'
      )
    ) {
      return false;
    }
    // Rethrow any other errors
    throw actualError;
  }
}

module.exports = validateApiKeyWithTestMessage;