/**
 * Updates global usage statistics and model-specific token counts.
 *
 * @async
 * @function updateModelTokenStatistics
 * @param {number} apiCost - The cost incurred by the API call.
 * @param {number} apiDuration - The total duration of the API call (including retries).
 * @param {number} apiDurationWithoutRetries - The duration of the API call excluding retries.
 * @param {Object} tokenUsage - An object containing token usage statistics for the API call.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens produced.
 * @param {number} [tokenUsage.cache_read_input_tokens=0] - Number of input tokens read from cache (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens=0] - Number of input tokens used for cache creation (optional).
 * @param {string} modelName - The identifier for the model whose statistics are being updated.
 * @returns {Promise<void>} Resolves when statistics have been updated.
 */
async function updateModelTokenStatistics(apiCost, apiDuration, apiDurationWithoutRetries, tokenUsage, modelName) {
  // Update global statistics
  N9.totalCost += apiCost;
  N9.totalAPIDuration += apiDuration;
  N9.totalAPIDurationWithoutRetries += apiDurationWithoutRetries;

  // Retrieve or initialize model-specific token statistics
  const modelTokenStats = N9.modelTokens[modelName] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0
  };

  // Update model-specific token statistics
  modelTokenStats.inputTokens += tokenUsage.input_tokens;
  modelTokenStats.outputTokens += tokenUsage.output_tokens;
  modelTokenStats.cacheReadInputTokens += tokenUsage.cache_read_input_tokens ?? 0;
  modelTokenStats.cacheCreationInputTokens += tokenUsage.cache_creation_input_tokens ?? 0;

  // Save updated statistics back to global state
  N9.modelTokens[modelName] = modelTokenStats;
}

module.exports = updateModelTokenStatistics;