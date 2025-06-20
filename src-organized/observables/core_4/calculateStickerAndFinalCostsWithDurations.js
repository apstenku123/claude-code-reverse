/**
 * Calculates sticker and final costs in USD, along with operation durations, and triggers a side-effect.
 *
 * @param {Object} sourceObservable - The source observable or data input for the cost calculation.
 * @param {Object} config - Configuration object for the cost calculation.
 * @param {number} operationStartTimestamp - Timestamp (in ms) when the main operation started.
 * @param {number} operationWithRetriesStartTimestamp - Timestamp (in ms) when the operation including retries started.
 * @returns {Object} An object containing sticker cost, final cost, and durations in milliseconds.
 */
function calculateStickerAndFinalCostsWithDurations(
  sourceObservable,
  config,
  operationStartTimestamp,
  operationWithRetriesStartTimestamp
) {
  // Destructure sticker and final cost in USD from calculateModelStickerCost calculation
  const {
    stickerCostUSD,
    finalCostUSD
  } = calculateModelStickerCost(sourceObservable, config);

  // Calculate duration since operation started
  const durationMs = Date.now() - operationStartTimestamp;

  // Calculate duration since operation with retries started
  const durationMsIncludingRetries = Date.now() - operationWithRetriesStartTimestamp;

  // Trigger side-effect with calculated values (possibly for logging, analytics, etc.)
  trackModelTokenUsage(finalCostUSD, durationMsIncludingRetries, durationMs, config, sourceObservable);

  // Return all relevant calculated values
  return {
    stickerCostUSD,
    costUSD: finalCostUSD,
    durationMs,
    durationMsIncludingRetries
  };
}

module.exports = calculateStickerAndFinalCostsWithDurations;