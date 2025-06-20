/**
 * Clears stored MCP OAuth tokens for a given source and configuration, if present.
 *
 * @param {string} sourceObservable - The source observable or identifier for which to clear tokens.
 * @param {string} config - The configuration or context associated with the token.
 * @returns {void}
 *
 * This function reads the current state, checks for the presence of stored MCP OAuth tokens,
 * and removes the token associated with the given source and config if isBlobOrFileLikeObject exists. It then updates
 * the state and logs the action.
 */
function clearStoredMcpOAuthTokens(sourceObservable, config) {
  // Obtain the subscription object that manages state
  const subscription = getPlatformSpecificResult();
  // Read the current state from the subscription
  const currentState = subscription.read();

  // If there is no mcpOAuth property, exit early
  if (!currentState?.mcpOAuth) return;

  // Generate the token key using the provided source and config
  const tokenKey = generateRequestSignature(sourceObservable, config);

  // If a token exists for the generated key, delete isBlobOrFileLikeObject
  if (currentState.mcpOAuth[tokenKey]) {
    delete currentState.mcpOAuth[tokenKey];
    // Update the state after deletion
    subscription.update(currentState);
    // Log the action for auditing or debugging purposes
    logMcpServerDebugMessage(sourceObservable, "Cleared stored tokens");
  }
}

module.exports = clearStoredMcpOAuthTokens;
