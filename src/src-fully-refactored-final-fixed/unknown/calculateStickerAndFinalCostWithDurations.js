/**
 * Calculates the sticker and final cost in USD, along with operation durations.
 *
 * This function computes the sticker and final cost in USD for a given source and configuration,
 * then calculates the duration of the operation and the duration including retries. It also
 * triggers a side-effect function with these values.
 *
 * @param {object} sourceObservable - The source observable or input data for the cost calculation.
 * @param {object} config - Configuration options for the cost calculation.
 * @param {number} subscriptionStartTimestamp - The timestamp (in ms) when the subscription started.
 * @param {number} uiActionStartTimestamp - The timestamp (in ms) when the UI action click transaction started.
 * @returns {object} An object containing stickerCostUSD, costUSD, durationMs, and durationMsIncludingRetries.
 */
function calculateStickerAndFinalCostWithDurations(
  sourceObservable,
  config,
  subscriptionStartTimestamp,
  uiActionStartTimestamp
) {
  // Calculate sticker and final cost in USD using external calculateModelStickerCost function
  const {
    stickerCostUSD,
    finalCostUSD
  } = calculateModelStickerCost(sourceObservable, config);

  // Calculate duration since subscription started
  const durationMs = Date.now() - subscriptionStartTimestamp;

  // Calculate duration since UI action click transaction started (includes retries)
  const durationMsIncludingRetries = Date.now() - uiActionStartTimestamp;

  // Trigger side-effect with calculated values (external function)
  trackModelTokenUsage(finalCostUSD, durationMsIncludingRetries, durationMs, config, sourceObservable);

  // Return all calculated values in a structured object
  return {
    stickerCostUSD,
    costUSD: finalCostUSD,
    durationMs,
    durationMsIncludingRetries
  };
}

module.exports = calculateStickerAndFinalCostWithDurations;