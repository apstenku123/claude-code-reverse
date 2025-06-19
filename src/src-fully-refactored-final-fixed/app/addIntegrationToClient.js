/**
 * Adds an integration to the current SDK client if available.
 *
 * @param {Object} integration - The integration object to add. Must have a 'name' property.
 * @returns {void}
 *
 * If no SDK client is available, logs a warning (in debug mode) and does nothing.
 */
function addIntegrationToClient(integration) {
  // Retrieve the current SDK client instance
  const sdkClient = ue2.getClient();

  // If the client is not available or does not support adding integrations, log a warning and exit
  if (!sdkClient || typeof sdkClient.addIntegration !== 'function') {
    if (aU1.DEBUG_BUILD) {
      Z91.logger.warn(
        `Cannot add integration "${integration.name}" because no SDK Client is available.`
      );
    }
    return;
  }

  // Add the integration to the SDK client
  sdkClient.addIntegration(integration);
}

module.exports = addIntegrationToClient;