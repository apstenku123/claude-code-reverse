/**
 * Adds entries to an array property in either the global or project configuration.
 * Validates the property, logs errors if invalid, and updates the configuration if new entries are added.
 *
 * @param {string} configKey - The key of the array property to update in the config.
 * @param {Array<any>} entriesToAdd - The entries to add to the array property.
 * @param {boolean} useGlobalConfig - Whether to update the global config (true) or the project config (false).
 * @param {boolean} [shouldExitProcess=true] - Whether to exit the process after operation (default: true).
 * @returns {void}
 */
function addArrayConfigEntries(configKey, entriesToAdd, useGlobalConfig, shouldExitProcess = true) {
  // Log the config addition attempt
  logTelemetryEventIfEnabled("tengu_config_add", {
    key: configKey,
    global: useGlobalConfig,
    count: entriesToAdd.length
  });

  // Validate that the configKey is a valid array property in the chosen config
  if (!isArrayPropertyInConfigOrHL(configKey, useGlobalConfig)) {
    if (useGlobalConfig) {
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

  if (useGlobalConfig) {
    // Update global config
    const globalConfig = getCachedOrFreshConfig();
    const arrayKey = configKey;
    const currentArray = globalConfig[arrayKey] || [];
    const uniqueEntries = new Set(currentArray);
    const originalSize = uniqueEntries.size;

    // Add new entries
    for (const entry of entriesToAdd) {
      uniqueEntries.add(entry);
    }

    // If new entries were added, update the config
    if (uniqueEntries.size > originalSize) {
      const updatedArray = Array.from(uniqueEntries).sort();
      updateProjectsAccessor({
        ...globalConfig,
        [arrayKey]: updatedArray
      });
    }
  } else {
    // Update project config
    const arrayKey = configKey;
    warnIfConfigMigrated(arrayKey, entriesToAdd); // Possibly logs or tracks the addition
    const projectConfig = getProjectSubscriptionConfig();
    const currentArray = projectConfig[arrayKey] || [];
    const uniqueEntries = new Set(currentArray);
    const originalSize = uniqueEntries.size;

    // Add new entries
    for (const entry of entriesToAdd) {
      uniqueEntries.add(entry);
    }

    // If new entries were added, update the config
    if (uniqueEntries.size > originalSize) {
      const updatedArray = Array.from(uniqueEntries).sort();
      updateProjectInConfig({
        ...projectConfig,
        [arrayKey]: updatedArray
      });
    }
  }

  // Optionally exit process successfully
  if (shouldExitProcess) {
    process.exit(0);
  }
}

module.exports = addArrayConfigEntries;