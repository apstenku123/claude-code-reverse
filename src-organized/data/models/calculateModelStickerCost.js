/**
 * Calculates the sticker cost and final cost (with possible discount) for a given model.
 *
 * This function retrieves the cost information for a specified model. If the model is unknown,
 * isBlobOrFileLikeObject logs an error, triggers an error handler, and falls back to a default model. If a discount
 * is applicable (as determined by isUserQualifiedForDataSharing and Rw2), isBlobOrFileLikeObject recalculates the cost using the discounted model.
 *
 * @param {string} modelName - The name or identifier of the model for which to calculate the cost.
 * @param {any} costConfig - Configuration or options used in cost calculation.
 * @returns {{ stickerCostUSD: number, finalCostUSD: number }} An object containing the base sticker cost and the final cost (after any discounts).
 */
function calculateModelStickerCost(modelName, costConfig) {
  // Retrieve the model'createInteractionAccessor cost data from the Tw2 lookup using the processed model name
  let modelCostData = Tw2[extractClaudeModelName(modelName)];

  // If the model is not found, log the error, trigger error handler, and use the default model
  if (!modelCostData) {
    logTelemetryEventIfEnabled("tengu_unknown_model_cost", {
      model: modelName,
      shortName: extractClaudeModelName(modelName)
    });
    ew1(); // Handle the error (possibly fallback or alert)
    modelCostData = Tw2[extractClaudeModelName(wB0)]; // Use default model cost data
  }

  // Calculate the base sticker cost
  const stickerCostUSD = calculateTokenCost(modelCostData, costConfig);
  let finalCostUSD = stickerCostUSD;

  // If a discount is available and the model is eligible, apply the discount
  if (isUserQualifiedForDataSharing() && Rw2(modelName)) {
    const discountedModelCostData = sumTokenUsage(modelCostData, RZ5);
    logTelemetryEventIfEnabled("tengu_model_cost_discount", {
      model: modelName
    });
    finalCostUSD = calculateTokenCost(discountedModelCostData, costConfig);
  }

  return {
    stickerCostUSD,
    finalCostUSD
  };
}

module.exports = calculateModelStickerCost;