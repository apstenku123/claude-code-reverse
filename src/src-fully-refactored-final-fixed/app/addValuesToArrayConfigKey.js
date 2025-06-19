/**
 * Adds values to a specified array configuration key in either the global or project config.
 * Ensures the key exists and is an array, merges new values, sorts, and updates the config if needed.
 * Optionally exits the process on completion or error.
 *
 * @param {string} configKey - The configuration key to update (must be an array property).
 * @param {Array<any>} valuesToAdd - The values to add to the array config key.
 * @param {boolean} isGlobalConfig - If true, operate on the global config; otherwise, project config.
 * @param {boolean} [shouldExitProcess=true] - If true, exit the process after completion or error.
 * @returns {void}
 */
function addValuesToArrayConfigKey(configKey, valuesToAdd, isGlobalConfig, shouldExitProcess = true) {
  // Log the config addition attempt
  logTelemetryEventIfEnabled("tengu_config_add", {
    key: configKey,
    global: isGlobalConfig,
    count: valuesToAdd.length
  });

  // Validate that the config key exists and is an array
  if (!isConfigOrHLArrayProperty(configKey, isGlobalConfig)) {
    if (isGlobalConfig) {
      console.error(`Error: '${configKey}' is not a valid array config key in global config`);
    } else {
      console.error(`Error: '${configKey}' is not a valid array config key in project config`);
    }
    if (shouldExitProcess) {
      process.exit(1);
    } else {
      return;
    }
  }

  if (isGlobalConfig) {
    // --- GLOBAL CONFIG ---
    const globalConfig = getCachedOrFreshConfig();
    const currentArray = globalConfig[configKey] || [];
    const mergedSet = new Set(currentArray);
    const originalSize = mergedSet.size;

    // Add new values to the set
    for (const value of valuesToAdd) {
      mergedSet.add(value);
    }

    // If new values were added, update and sort the array in config
    if (mergedSet.size > originalSize) {
      const updatedArray = Array.from(mergedSet).sort();
      updateProjectsAccessor({
        ...globalConfig,
        [configKey]: updatedArray
      });
    }
  } else {
    // --- PROJECT CONFIG ---
    // warnIfConfigMigrated appears to perform a pre-update or validation step
    warnIfConfigMigrated(configKey, valuesToAdd);

    const projectConfig = getProjectSubscriptionConfig();
    const currentArray = projectConfig[configKey] || [];
    const mergedSet = new Set(currentArray);
    const originalSize = mergedSet.size;

    // Add new values to the set
    for (const value of valuesToAdd) {
      mergedSet.add(value);
    }

    // If new values were added, update and sort the array in config
    if (mergedSet.size > originalSize) {
      const updatedArray = Array.from(mergedSet).sort();
      updateProjectInConfig({
        ...projectConfig,
        [configKey]: updatedArray
      });
    }
  }

  // Optionally exit the process successfully
  if (shouldExitProcess) {
    process.exit(0);
  }
}

module.exports = addValuesToArrayConfigKey;