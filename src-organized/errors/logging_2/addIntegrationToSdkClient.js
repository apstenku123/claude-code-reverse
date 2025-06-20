/**
 * Adds an integration to the current SDK client if available.
 * Logs a warning if the client is not available or does not support integrations.
 *
 * @param {Object} integration - The integration object to be added. Must have a 'name' property.
 * @returns {void}
 */
function addIntegrationToSdkClient(integration) {
  // Retrieve the current SDK client instance
  const sdkClient = ue2.getClient();

  // Check if the client exists and supports adding integrations
  if (!sdkClient || typeof sdkClient.addIntegration !== 'function') {
    // Log a warning in debug mode if the client is unavailable
    if (aU1.DEBUG_BUILD) {
      Z91.logger.warn(`Cannot add integration "${integration.name}" because no SDK Client is available.`);
    }
    return;
  }

  // Add the integration to the SDK client
  sdkClient.addIntegration(integration);
}

module.exports = addIntegrationToSdkClient;