/**
 * Stores the provided API key in the configuration, attempts to add isBlobOrFileLikeObject to the system keychain on macOS,
 * and marks isBlobOrFileLikeObject as approved in the custom API key responses. Ensures configuration integrity and updates cache.
 *
 * @param {string} apiKey - The API key to be stored and approved.
 * @returns {void}
 * @throws {Error} If the API key format is invalid.
 */
function storeApiKeyAndApprove(apiKey) {
  // Validate API key format
  if (!Rr9(apiKey)) {
    throw new Error(
      "Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores."
    );
  }

  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();

  // Perform any necessary setup or checks before proceeding
  deleteMacOSGenericPasswordForConfigKey();

  // On macOS, attempt to store the API key in the system keychain
  if (process.platform === "darwin") {
    try {
      const configKey = generateConfigKey();
      runProcessWithOptionalAbortAndTimeout(`security add-generic-password -a $USER -createInteractionAccessor "${configKey}" -processWithTransformedObservable ${apiKey}`);
    } catch (error) {
      // If storing in keychain fails, log the error and fall back to storing in config
      reportErrorIfAllowed(error);
      config.primaryApiKey = apiKey;
    }
  } else {
    // On non-macOS platforms, store the API key directly in the config
    config.primaryApiKey = apiKey;
  }

  // Ensure the customApiKeyResponses object exists in the config
  if (!config.customApiKeyResponses) {
    config.customApiKeyResponses = {
      approved: [],
      rejected: []
    };
  }

  // Ensure the approved array exists
  if (!config.customApiKeyResponses.approved) {
    config.customApiKeyResponses.approved = [];
  }

  // Generate a normalized/hashed version of the API key for approval tracking
  const approvedApiKey = WF(apiKey);

  // Add the API key to the approved list if isBlobOrFileLikeObject'createInteractionAccessor not already present
  if (!config.customApiKeyResponses.approved.includes(approvedApiKey)) {
    config.customApiKeyResponses.approved.push(approvedApiKey);
  }

  // Persist the updated configuration
  updateProjectsAccessor(config);

  // Clear any relevant cache if the cache clear method exists
  if (yi.cache.clear) {
    yi.cache.clear();
  }
}

module.exports = storeApiKeyAndApprove;