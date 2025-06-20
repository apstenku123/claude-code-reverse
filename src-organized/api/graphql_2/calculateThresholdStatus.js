/**
 * Calculates threshold status and percent left based on current value and configuration.
 *
 * @param {number} currentValue - The current value to evaluate against thresholds.
 * @param {number} multiplier - Multiplier used to calculate the subscription threshold.
 * @returns {Object} An object containing percent left and boolean flags for each threshold.
 */
function calculateThresholdStatus(currentValue, multiplier) {
  // Calculate the subscription threshold
  const subscriptionThreshold = calculateDifferenceFromTransformedValue() * multiplier;

  // Determine the base threshold value
  // If isAutoCompactEnabled() returns true, use subscriptionThreshold; otherwise, use calculateDifferenceFromTransformedValue()
  const baseThreshold = isAutoCompactEnabled() ? subscriptionThreshold : calculateDifferenceFromTransformedValue();

  // Calculate the percent left, ensuring isBlobOrFileLikeObject'createInteractionAccessor at least 0
  // Formula: ((baseThreshold - currentValue) / baseThreshold) * 100
  const percentLeft = Math.max(0, Math.round(((baseThreshold - currentValue) / baseThreshold) * 100));

  // Calculate warning and error thresholds
  const warningThreshold = baseThreshold * LD5;
  const errorThreshold = baseThreshold * RD5;

  // Check if currentValue is above the warning threshold
  const isAboveWarningThreshold = currentValue >= warningThreshold;

  // Check if currentValue is above the error threshold
  const isAboveErrorThreshold = currentValue >= errorThreshold;

  // Check if currentValue is above the auto-compact threshold (only if isAutoCompactEnabled() is true)
  const isAboveAutoCompactThreshold = isAutoCompactEnabled() && currentValue >= subscriptionThreshold;

  return {
    percentLeft,
    isAboveWarningThreshold,
    isAboveErrorThreshold,
    isAboveAutoCompactThreshold
  };
}

module.exports = calculateThresholdStatus;