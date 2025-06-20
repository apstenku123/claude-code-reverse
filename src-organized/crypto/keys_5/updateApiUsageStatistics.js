/**
 * Updates global API usage statistics and token counts for a specific model.
 *
 * @async
 * @function updateApiUsageStatistics
 * @param {number} cost - The cost incurred by the API call.
 * @param {number} apiDuration - The duration of the API call (including retries), in milliseconds.
 * @param {number} apiDurationWithoutRetries - The duration of the API call (excluding retries), in milliseconds.
 * @param {Object} tokenUsage - An object containing token usage details for the API call.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens generated.
 * @param {number} [tokenUsage.cache_read_input_tokens=0] - Number of input tokens read from cache (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens=0] - Number of input tokens used to create cache (optional).
 * @param {string} modelName - The name of the model for which to update token statistics.
 * @returns {Promise<void>} Resolves when the statistics have been updated.
 */
async function updateApiUsageStatistics(cost, apiDuration, apiDurationWithoutRetries, tokenUsage, modelName) {
  // Update global cost and duration statistics
  N9.totalCost += cost;
  N9.totalAPIDuration += apiDuration;
  N9.totalAPIDurationWithoutRetries += apiDurationWithoutRetries;

  // Retrieve or initialize the token statistics object for the given model
  const modelTokenStats = N9.modelTokens[modelName] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0
  };

  // Update token statistics for the model
  modelTokenStats.inputTokens += tokenUsage.input_tokens;
  modelTokenStats.outputTokens += tokenUsage.output_tokens;
  modelTokenStats.cacheReadInputTokens += tokenUsage.cache_read_input_tokens ?? 0;
  modelTokenStats.cacheCreationInputTokens += tokenUsage.cache_creation_input_tokens ?? 0;

  // Save the updated statistics back to the global object
  N9.modelTokens[modelName] = modelTokenStats;
}

module.exports = updateApiUsageStatistics;