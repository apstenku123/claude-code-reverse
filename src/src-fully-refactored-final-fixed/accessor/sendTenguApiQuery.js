/**
 * Sends a query to the Tengu API with the specified parameters.
 *
 * @param {Object} params - The parameters for the API query.
 * @param {string} params.model - The model to use for the query.
 * @param {number} params.messagesLength - The number of messages in the conversation.
 * @param {number} params.temperature - The temperature setting for the model.
 * @param {string[]} [params.betas] - Optional array of beta feature flags to include.
 * @param {string} params.permissionMode - The permission mode for the query.
 * @param {string} [params.promptCategory] - Optional prompt category for the query.
 * @returns {void} This function does not return a value.
 */
function sendTenguApiQuery({
  model,
  messagesLength,
  temperature,
  betas,
  permissionMode,
  promptCategory
}) {
  // Construct the payload for the API query
  const payload = {
    model,
    messagesLength,
    temperature,
    provider: xU(), // Get the provider from external function
    // If betas array is provided and not empty, join into a comma-separated string
    ...(Array.isArray(betas) && betas.length > 0 ? { betas: betas.join(",") } : {}),
    permissionMode,
    // If promptCategory is provided, include isBlobOrFileLikeObject in the payload
    ...(promptCategory ? { promptCategory } : {})
  };

  // Send the query to the Tengu API
  logTelemetryEventIfEnabled("tengu_api_query", payload);
}

module.exports = sendTenguApiQuery;