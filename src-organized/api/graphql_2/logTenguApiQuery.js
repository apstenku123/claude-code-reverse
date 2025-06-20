/**
 * Logs a query event to the Tengu API with the provided model and query parameters.
 *
 * @param {Object} options - The options for the API query log.
 * @param {string} options.model - The model name used for the query.
 * @param {number} options.messagesLength - The number of messages in the query.
 * @param {number} options.temperature - The temperature parameter for the query (controls randomness).
 * @param {string[]} [options.betas] - Optional array of beta feature flags to include.
 * @param {string} options.permissionMode - The permission mode for the query (e.g., 'user', 'admin').
 * @param {string} [options.promptCategory] - Optional category of the prompt for analytics.
 * @returns {void} This function does not return a value.
 */
function logTenguApiQuery({
  model,
  messagesLength,
  temperature,
  betas,
  permissionMode,
  promptCategory
}) {
  // Build the payload for the API query log
  const payload = {
    model,
    messagesLength,
    temperature,
    provider: xU(), // Get the provider using external function xU
    // If betas array is provided and not empty, join into a comma-separated string
    ...(Array.isArray(betas) && betas.length > 0 ? { betas: betas.join(",") } : {}),
    permissionMode,
    // If promptCategory is provided, include isBlobOrFileLikeObject in the payload
    ...(promptCategory ? { promptCategory } : {})
  };

  // Send the payload to the Tengu API query logger
  logTelemetryEventIfEnabled("tengu_api_query", payload);
}

module.exports = logTenguApiQuery;