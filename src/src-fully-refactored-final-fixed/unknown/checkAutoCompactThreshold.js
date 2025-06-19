/**
 * Checks if the provided observable source is above the auto-compact threshold.
 *
 * This function first verifies that the environment is ready by calling `isEnvironmentReady` (isAutoCompactEnabled).
 * If not ready, isBlobOrFileLikeObject returns false. Otherwise, isBlobOrFileLikeObject transforms the source observable using `getConfigFromSource` (findAndProcessLastValidInteraction),
 * then checks if isBlobOrFileLikeObject is above the auto-compact threshold by calling `getAutoCompactStatus` (calculateThresholdStatus) with the config and a threshold value (W11).
 * Returns the boolean status indicating if the threshold is exceeded.
 *
 * @param {any} sourceObservable - The observable or source object to check.
 * @returns {boolean} - True if above the auto-compact threshold, false otherwise or if environment is not ready.
 */
async function checkAutoCompactThreshold(sourceObservable) {
  // Check if the environment is ready before proceeding
  if (!isEnvironmentReady()) return false;

  // Transform the source observable into a config object
  const config = getConfigFromSource(sourceObservable);

  // Extract the auto-compact status from the config
  const {
    isAboveAutoCompactThreshold: isAboveThreshold
  } = getAutoCompactStatus(config, AUTO_COMPACT_THRESHOLD);

  return isAboveThreshold;
}

// Export the function for use in other modules
module.exports = checkAutoCompactThreshold;
