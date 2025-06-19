/**
 * Stores the provided API key as the primary API key in the configuration.
 * On macOS, attempts to add the API key to the system keychain for security.
 * Ensures the API key is tracked as approved in the customApiKeyResponses config.
 *
 * @param {string} apiKey - The API key to store and approve.
 * @returns {void}
 * @throws {Error} If the API key format is invalid.
 */
function storePrimaryApiKey(apiKey) {
  // Validate API key format
  if (!Rr9(apiKey)) {
    throw new Error(
      "Invalid API key format. API key must contain only alphanumeric characters, dashes, and underscores."
    );
  }

  // Retrieve the current configuration
  const config = getCachedOrFreshConfig();

  // Perform any necessary pre-processing
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
    // On non-macOS platforms, store the API key in config
    config.primaryApiKey = apiKey;
  }

  // Ensure customApiKeyResponses structure exists
  if (!config.customApiKeyResponses) {
    config.customApiKeyResponses = {
      approved: [],
      rejected: []
    };
  }
  if (!config.customApiKeyResponses.approved) {
    config.customApiKeyResponses.approved = [];
  }

  // Generate a normalized/hashed version of the API key for approval tracking
  const approvedKey = WF(apiKey);

  // Add the API key to the approved list if not already present
  if (!config.customApiKeyResponses.approved.includes(approvedKey)) {
    config.customApiKeyResponses.approved.push(approvedKey);
  }

  // Persist the updated configuration
  updateProjectsAccessor(config);

  // Clear any relevant cache if the cache clear method exists
  if (yi.cache.clear) {
    yi.cache.clear();
  }
}

module.exports = storePrimaryApiKey;
