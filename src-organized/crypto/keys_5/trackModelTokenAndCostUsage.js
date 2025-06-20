/**
 * Tracks and records model usage statistics including cost and token counts.
 *
 * This function processes a model interaction, updates cost and token counters, and logs usage
 * for different token types (input, output, cache read, cache creation) associated with a model.
 *
 * @param {Observable} sourceObservable - The observable or data source representing the model interaction.
 * @param {Object} config - Configuration object for the model interaction.
 * @param {any} subscription - Subscription or context for the interaction (unused in this function).
 * @param {Object} tokenStats - An object containing token usage statistics for the interaction.
 * @param {string} modelName - The name or identifier of the model being tracked.
 * @returns {void}
 */
function trackModelTokenAndCostUsage(
  sourceObservable,
  config,
  subscription,
  tokenStats,
  modelName
) {
  // Process the model interaction (side effect, e.g., logging or mapping)
  updateModelTokenUsageAndApiStats(sourceObservable, config, subscription, tokenStats, modelName);

  // Add cost usage to the cost counter, if available
  const costCounter = j0A();
  if (costCounter) {
    costCounter.add(sourceObservable, { model: modelName });
  }

  // Add input token usage to the token counter, if available
  const tokenCounter = bp();
  if (tokenCounter) {
    tokenCounter.add(tokenStats.input_tokens, {
      type: "input",
      model: modelName
    });
    tokenCounter.add(tokenStats.output_tokens, {
      type: "output",
      model: modelName
    });
    tokenCounter.add(tokenStats.cache_read_input_tokens ?? 0, {
      type: "cacheRead",
      model: modelName
    });
    tokenCounter.add(tokenStats.cache_creation_input_tokens ?? 0, {
      type: "cacheCreation",
      model: modelName
    });
  }
}

module.exports = trackModelTokenAndCostUsage;