/**
 * Determines if the provided configuration is eligible for spawning and delegates to the spawn handler if so.
 *
 * @param {number} actionType - The type of action to check (should be 1 for spawn).
 * @param {Object} config - The configuration object for the action.
 * @param {string} config.original - The original identifier or data for the spawn action.
 * @param {Object} [config.file] - Optional file property; if present, spawning is not allowed.
 * @returns {any|null} The result of the spawn handler if eligible, otherwise null.
 */
function handleSpawnIfEligible(actionType, config) {
  // Check if the spawn feature is enabled, the action type is 1, and there is no file property in config
  if (lc1 && actionType === 1 && !config.file) {
    // Delegate to the spawn handler with the original data
    return ic1(config.original, "spawn");
  }
  // Not eligible for spawning
  return null;
}

module.exports = handleSpawnIfEligible;
