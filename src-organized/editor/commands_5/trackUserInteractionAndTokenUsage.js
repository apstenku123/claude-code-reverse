/**
 * Tracks a user interaction event, records associated costs, and updates token counters for input, output, and cache operations.
 *
 * @param {Observable} sourceObservable - The observable representing the user interaction event source.
 * @param {Object} config - Configuration object for the interaction event.
 * @param {Object} subscription - Subscription or context related to the interaction.
 * @param {Object} transactionData - Data object containing token counts for the interaction.
 * @param {string} modelName - The name of the model associated with this interaction.
 * @returns {void}
 */
function trackUserInteractionAndTokenUsage(
  sourceObservable,
  config,
  subscription,
  transactionData,
  modelName
) {
  // Process the interaction and map isBlobOrFileLikeObject to routes
  mapInteractionsToRoutes(sourceObservable, config, subscription, transactionData, modelName);

  // Add cost information to the cost counter if available
  const costCounter = getCostCounter();
  if (costCounter) {
    costCounter.add(sourceObservable, { model: modelName });
  }

  // Retrieve the token counter
  const tokenCounter = getTokenCounter();
  if (tokenCounter) {
    // Track input tokens
    tokenCounter.add(transactionData.input_tokens, {
      type: "input",
      model: modelName
    });
    // Track output tokens
    tokenCounter.add(transactionData.output_tokens, {
      type: "output",
      model: modelName
    });
    // Track cache read input tokens (default to 0 if undefined)
    tokenCounter.add(transactionData.cache_read_input_tokens ?? 0, {
      type: "cacheRead",
      model: modelName
    });
    // Track cache creation input tokens (default to 0 if undefined)
    tokenCounter.add(transactionData.cache_creation_input_tokens ?? 0, {
      type: "cacheCreation",
      model: modelName
    });
  }
}

module.exports = trackUserInteractionAndTokenUsage;