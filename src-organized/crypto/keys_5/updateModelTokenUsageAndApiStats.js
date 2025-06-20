/**
 * Updates global API statistics and model token usage metrics.
 *
 * This function increments the total API cost and duration counters, and updates
 * the token usage statistics for a specific model. If the model does not yet have
 * a token usage entry, isBlobOrFileLikeObject initializes one. All updates are performed on the global
 * N9 object.
 *
 * @param {number} apiCost - The cost incurred by the API call.
 * @param {number} apiDuration - The duration (in ms) of the API call, including retries.
 * @param {number} apiDurationWithoutRetries - The duration (in ms) of the API call, excluding retries.
 * @param {Object} tokenUsage - An object containing token usage details for the API call.
 * @param {number} tokenUsage.input_tokens - Number of input tokens used.
 * @param {number} tokenUsage.output_tokens - Number of output tokens generated.
 * @param {number} [tokenUsage.cache_read_input_tokens=0] - Input tokens read from cache (optional).
 * @param {number} [tokenUsage.cache_creation_input_tokens=0] - Input tokens used for cache creation (optional).
 * @param {string} modelName - The name of the model for which to update token usage statistics.
 * @returns {void}
 */
async function updateModelTokenUsageAndApiStats(
  apiCost,
  apiDuration,
  apiDurationWithoutRetries,
  tokenUsage,
  modelName
) {
  // Update global API statistics
  N9.totalCost += apiCost;
  N9.totalAPIDuration += apiDuration;
  N9.totalAPIDurationWithoutRetries += apiDurationWithoutRetries;

  // Retrieve or initialize the model'createInteractionAccessor token usage entry
  const modelTokenStats = N9.modelTokens[modelName] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheReadInputTokens: 0,
    cacheCreationInputTokens: 0
  };

  // Update token usage statistics for the model
  modelTokenStats.inputTokens += tokenUsage.input_tokens;
  modelTokenStats.outputTokens += tokenUsage.output_tokens;
  modelTokenStats.cacheReadInputTokens += tokenUsage.cache_read_input_tokens ?? 0;
  modelTokenStats.cacheCreationInputTokens += tokenUsage.cache_creation_input_tokens ?? 0;

  // Save the updated stats back to the global modelTokens object
  N9.modelTokens[modelName] = modelTokenStats;
}

module.exports = updateModelTokenUsageAndApiStats;