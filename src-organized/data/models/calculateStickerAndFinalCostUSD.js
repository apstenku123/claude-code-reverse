/**
 * Calculates the sticker and final USD cost for a given model source and configuration.
 * Handles unknown model costs and applies discounts for first-party sources if applicable.
 *
 * @param {string} modelSource - The identifier or name of the model source.
 * @param {object} config - The configuration object for cost calculation.
 * @returns {{ stickerCostUSD: number, finalCostUSD: number }} An object containing the sticker (base) cost and the final cost in USD.
 */
function calculateStickerAndFinalCostUSD(modelSource, config) {
  // Retrieve the cost subscription for the given model source
  const modelShortName = extractClaudeModelName(modelSource);
  let modelCostSubscription = Tw2[modelShortName];

  // If the model cost subscription is not found, log the error and mark as unknown
  if (!modelCostSubscription) {
    logTelemetryEventIfEnabled("tengu_unknown_model_cost", {
      model: modelSource,
      shortName: modelShortName
    });
    ew1(); // Mark model cost as unknown
    // Fallback to a default model cost subscription
    modelCostSubscription = Tw2[extractClaudeModelName(wB0)];
  }

  // Calculate the base sticker cost in USD
  const stickerCostUSD = calculateTokenCost(modelCostSubscription, config);
  let finalCostUSD = stickerCostUSD;

  // If the environment allows discounts and the model is a first-party source
  if (isUserQualifiedForDataSharing() && Rw2(modelSource)) {
    // Apply discount to the model cost subscription
    const discountedSubscription = sumTokenUsage(modelCostSubscription, RZ5);
    logTelemetryEventIfEnabled("tengu_model_cost_discount", {
      model: modelSource
    });
    finalCostUSD = calculateTokenCost(discountedSubscription, config);
  }

  return {
    stickerCostUSD,
    finalCostUSD
  };
}

module.exports = calculateStickerAndFinalCostUSD;