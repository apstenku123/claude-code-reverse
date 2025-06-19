/**
 * Checks if the given configuration object is missing a 'file' property and, if so, triggers a spawn action.
 *
 * @param {number} actionType - The type of action to check for (expects 1 for spawn).
 * @param {Object} config - The configuration object containing activity details.
 * @param {string} config.original - The original command or path to spawn.
 * @param {boolean} [config.file] - Optional file property; if falsy, triggers spawn.
 * @returns {any|null} The result of the spawn action if conditions are met; otherwise, null.
 */
function handleSpawnIfFileMissing(actionType, config) {
  // Check if the global flag 'lc1' is enabled, actionType is 1, and config does not have a 'file' property
  if (lc1 && actionType === 1 && !config.file) {
    // Call the external 'ic1' function with the original command and 'spawn' action
    return ic1(config.original, "spawn");
  }
  // Return null if conditions are not met
  return null;
}

module.exports = handleSpawnIfFileMissing;