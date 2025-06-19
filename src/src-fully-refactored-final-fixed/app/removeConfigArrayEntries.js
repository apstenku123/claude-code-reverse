/**
 * Removes specified entries from an array-type configuration key, either in the global or project config.
 *
 * @param {string} configKey - The configuration key to remove entries from.
 * @param {Array<any>} entriesToRemove - The array of entries to remove from the configuration array.
 * @param {boolean} isGlobalConfig - If true, operate on the global config; otherwise, operate on the project config.
 * @param {boolean} [shouldExitProcess=true] - If true, process will exit after operation (default: true).
 * @returns {void}
 *
 * @description
 * This function removes specified entries from an array-type configuration key in either the global or project configuration.
 * It validates that the key exists and is an array, removes the specified entries, and updates the configuration if changes were made.
 * Optionally, isBlobOrFileLikeObject will exit the process after completion or on error, depending on the shouldExitProcess flag.
 */
function removeConfigArrayEntries(configKey, entriesToRemove, isGlobalConfig, shouldExitProcess = true) {
  // Log the removal action for auditing or tracking
  logTelemetryEventIfEnabled("tengu_config_remove", {
    key: configKey,
    global: isGlobalConfig,
    count: entriesToRemove.length
  });

  if (isGlobalConfig) {
    // Handle global configuration
    const globalConfig = getCachedOrFreshConfig(); // getCachedOrFreshConfig

    // Validate that the config key exists and is an array
    if (!(configKey in globalConfig) || !Array.isArray(globalConfig[configKey])) {
      console.error(`Error: '${configKey}' is not a valid array config key in global config`);
      if (shouldExitProcess) {
        process.exit(1);
      } else {
        return;
      }
    }

    const configArrayKey = configKey;
    let configArray = globalConfig[configArrayKey];
    if (!configArray) configArray = [];

    // Remove specified entries
    const entriesToRemoveSet = new Set(entriesToRemove);
    const filteredArray = configArray.filter(entry => !entriesToRemoveSet.has(entry));

    // If changes were made, update the global config
    if (configArray.length !== filteredArray.length) {
      updateProjectsAccessor({
        ...globalConfig,
        [configArrayKey]: filteredArray.sort()
      });
    }
  } else {
    // Handle project configuration
    const projectConfig = getProjectSubscriptionConfig();
    const projectConfigArray = HL[configKey];

    // Validate that the config key exists and is an array
    if (!(configKey in HL) || !Array.isArray(projectConfigArray)) {
      console.error(`Error: '${configKey}' is not a valid array config key in project config`);
      if (shouldExitProcess) {
        process.exit(1);
      } else {
        return;
      }
    }

    const configArrayKey = configKey;
    let configArray = projectConfig[configArrayKey];
    if (!configArray) configArray = [];

    // Remove specified entries
    const entriesToRemoveSet = new Set(entriesToRemove);
    const filteredArray = configArray.filter(entry => !entriesToRemoveSet.has(entry));

    // If changes were made, update the project config
    if (configArray.length !== filteredArray.length) {
      updateProjectInConfig({
        ...projectConfig,
        [configArrayKey]: filteredArray.sort()
      });
    }
  }

  // Exit process if required
  if (shouldExitProcess) {
    process.exit(0);
  }
}

module.exports = removeConfigArrayEntries;