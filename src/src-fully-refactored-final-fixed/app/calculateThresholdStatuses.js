/**
 * Calculates percentage remaining and threshold statuses based on current value and scaling factor.
 *
 * @param {number} currentValue - The current measured value to evaluate (e.g., memory used).
 * @param {number} scalingFactor - The scaling factor to apply (e.g., max limit, quota).
 * @returns {Object} Object containing percent left and boolean flags for various thresholds.
 * @property {number} percentLeft - Percentage of resource left (0-100).
 * @property {boolean} isAboveWarningThreshold - True if currentValue is above the warning threshold.
 * @property {boolean} isAboveErrorThreshold - True if currentValue is above the error threshold.
 * @property {boolean} isAboveAutoCompactThreshold - True if currentValue is above the auto-compact threshold.
 */
function calculateThresholdStatuses(currentValue, scalingFactor) {
  // Calculate the auto-compact threshold (deepCloneWithCycleDetection)
  const autoCompactThreshold = calculateDifferenceFromTransformedValue() * scalingFactor;

  // Determine the base limit (createObjectTracker):
  // If isAutoCompactEnabled() is true, use autoCompactThreshold; otherwise, use calculateDifferenceFromTransformedValue() directly
  const baseLimit = isAutoCompactEnabled() ? autoCompactThreshold : calculateDifferenceFromTransformedValue();

  // Calculate percent left, ensuring non-negative and rounded
  const percentLeft = Math.max(0, Math.round(((baseLimit - currentValue) / baseLimit) * 100));

  // Calculate warning and error thresholds
  const warningThreshold = baseLimit * LD5;
  const errorThreshold = baseLimit * RD5;

  // Check if currentValue is above warning threshold
  const isAboveWarningThreshold = currentValue >= warningThreshold;

  // Check if currentValue is above error threshold
  const isAboveErrorThreshold = currentValue >= errorThreshold;

  // Check if currentValue is above auto-compact threshold (only if isAutoCompactEnabled() is true)
  const isAboveAutoCompactThreshold = isAutoCompactEnabled() && currentValue >= autoCompactThreshold;

  return {
    percentLeft,
    isAboveWarningThreshold,
    isAboveErrorThreshold,
    isAboveAutoCompactThreshold
  };
}

module.exports = calculateThresholdStatuses;