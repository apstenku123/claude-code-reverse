/**
 * Updates global API usage statistics and per-model token usage statistics.
 *
 * This function increments the global total cost, total API duration, and total API duration without retries.
 * It also updates the token usage statistics for a specific model, including input tokens, output tokens,
 * cache read input tokens, and cache creation input tokens.
 *
 * @async
 * @param {number} apiCost - The cost incurred by the API call.
 * @param {number} apiDurationMs - The duration of the API call in milliseconds (including retries).
 * @param {number} apiDurationWithoutRetriesMs - The duration of the API call in milliseconds (excluding retries).
 * @param {object} tokenUsage - An object containing token usage statistics for the API call.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens generated.
 * @param {number} [tokenUsage.cache_read_input_tokens=0] - Number of input tokens read from cache (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens=0] - Number of input tokens used to create cache (optional).
 * @param {string} modelName - The name of the model for which to update token statistics.
 * @returns {Promise<void>} Resolves when the statistics have been updated.
 */
async function updateApiUsageAndModelTokenStats(
  apiCost,
  apiDurationMs,
  apiDurationWithoutRetriesMs,
  tokenUsage,
  modelName
) {
  // Update global API usage statistics
  N9.totalCost += apiCost;
  N9.totalAPIDuration += apiDurationMs;
  N9.totalAPIDurationWithoutRetries += apiDurationWithoutRetriesMs;

  // Retrieve or initialize the token usage stats for the given model
  const modelTokenStats = N9.modelTokens[modelName] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0
  };

  // Update the model'createInteractionAccessor token usage statistics
  modelTokenStats.inputTokens += tokenUsage.input_tokens;
  modelTokenStats.outputTokens += tokenUsage.output_tokens;
  modelTokenStats.cacheReadInputTokens += tokenUsage.cache_read_input_tokens ?? 0;
  modelTokenStats.cacheCreationInputTokens += tokenUsage.cache_creation_input_tokens ?? 0;

  // Save the updated stats back to the global modelTokens object
  N9.modelTokens[modelName] = modelTokenStats;
}

module.exports = updateApiUsageAndModelTokenStats;