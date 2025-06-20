/**
 * Tracks and logs model token usage for a given operation, including input, output, and cache tokens.
 *
 * @param {Observable} sourceObservable - The observable or event source being tracked.
 * @param {Object} config - Configuration or metadata associated with the operation.
 * @param {any} subscription - Subscription or context object for the operation.
 * @param {Object} tokenInfo - Object containing token counts for input, output, and cache operations.
 * @param {string} modelName - The name or identifier of the model being used.
 * @returns {void}
 */
function trackModelTokenUsage(sourceObservable, config, subscription, tokenInfo, modelName) {
  // Process the interaction entries for tracking
  updateModelTokenUsageAndApiStats(sourceObservable, config, subscription, tokenInfo, modelName);

  // Optionally add the source observable to the model tracker if available
  const modelTracker = j0A();
  if (modelTracker) {
    modelTracker.add(sourceObservable, { model: modelName });
  }

  // Optionally add token usage to the token tracker if available
  const tokenTracker = bp();
  if (tokenTracker) {
    // Track input tokens
    tokenTracker.add(tokenInfo.input_tokens, {
      type: "input",
      model: modelName
    });
    // Track output tokens
    tokenTracker.add(tokenInfo.output_tokens, {
      type: "output",
      model: modelName
    });
    // Track cache read input tokens (default to 0 if undefined)
    tokenTracker.add(tokenInfo.cache_read_input_tokens ?? 0, {
      type: "cacheRead",
      model: modelName
    });
    // Track cache creation input tokens (default to 0 if undefined)
    tokenTracker.add(tokenInfo.cache_creation_input_tokens ?? 0, {
      type: "cacheCreation",
      model: modelName
    });
  }
}

module.exports = trackModelTokenUsage;