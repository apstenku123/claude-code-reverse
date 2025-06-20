/**
 * Updates global API usage statistics and model token counts for a specific model.
 *
 * @async
 * @function updateApiUsageAndModelTokens
 * @param {number} apiCost - The cost incurred by the API call.
 * @param {number} apiDuration - The duration of the API call (including retries).
 * @param {number} apiDurationWithoutRetries - The duration of the API call (excluding retries).
 * @param {Object} tokenUsage - An object containing token usage statistics for the API call.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens generated.
 * @param {number} [tokenUsage.cache_read_input_tokens=0] - Number of input tokens read from cache (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens=0] - Number of input tokens used for cache creation (optional).
 * @param {string} modelName - The name of the model for which tokens are being tracked.
 * @returns {Promise<void>} Resolves when the statistics have been updated.
 */
async function updateApiUsageAndModelTokens(
  apiCost,
  apiDuration,
  apiDurationWithoutRetries,
  tokenUsage,
  modelName
) {
  // Update global API usage statistics
  N9.totalCost += apiCost;
  N9.totalAPIDuration += apiDuration;
  N9.totalAPIDurationWithoutRetries += apiDurationWithoutRetries;

  // Retrieve or initialize token statistics for the given model
  const existingModelTokens = N9.modelTokens[modelName] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0
  };

  // Update token statistics for the model
  existingModelTokens.inputTokens += tokenUsage.input_tokens;
  existingModelTokens.outputTokens += tokenUsage.output_tokens;
  existingModelTokens.cacheReadInputTokens += tokenUsage.cache_read_input_tokens ?? 0;
  existingModelTokens.cacheCreationInputTokens += tokenUsage.cache_creation_input_tokens ?? 0;

  // Save updated token statistics back to the global object
  N9.modelTokens[modelName] = existingModelTokens;
}

module.exports = updateApiUsageAndModelTokens;