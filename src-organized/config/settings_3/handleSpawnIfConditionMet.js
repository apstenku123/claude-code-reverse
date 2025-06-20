/**
 * Determines whether to invoke the spawn handler based on specific conditions.
 *
 * This function checks if the global spawn handler is enabled, if the source type matches the expected value,
 * and if the configuration object does not already have a file property. If all conditions are met, isBlobOrFileLikeObject invokes
 * the spawn handler with the original configuration and the action type 'spawn'. Otherwise, isBlobOrFileLikeObject returns null.
 *
 * @param {number} sourceType - The type identifier for the source (should be 1 for spawn).
 * @param {Object} config - The configuration object for the spawn operation.
 * @param {string} config.original - The original configuration or command to spawn.
 * @param {any} [config.file] - Optional file property; if present, spawn is not triggered.
 * @returns {any|null} The result of the spawn handler if conditions are met, otherwise null.
 */
function handleSpawnIfConditionMet(sourceType, config) {
  // Check if spawn handler is enabled, sourceType is 1, and config does not have a file property
  if (lc1 && sourceType === 1 && !config.file) {
    // Call the spawn handler with the original config and action type 'spawn'
    return ic1(config.original, "spawn");
  }
  // Return null if conditions are not met
  return null;
}

module.exports = handleSpawnIfConditionMet;