/**
 * Removes specified items from a named array configuration key in either global or project config.
 *
 * @param {string} configKey - The configuration key (must reference an array in config).
 * @param {Array<any>} itemsToRemove - Array of items to remove from the config array.
 * @param {boolean} isGlobalConfig - If true, operate on global config; otherwise, project config.
 * @param {boolean} [shouldExitProcess=true] - If true, exit the process after operation (default: true).
 * @returns {void}
 */
function removeConfigArrayItems(configKey, itemsToRemove, isGlobalConfig, shouldExitProcess = true) {
  // Log the removal intent for auditing or debugging
  logTelemetryEventIfEnabled("tengu_config_remove", {
    key: configKey,
    global: isGlobalConfig,
    count: itemsToRemove.length
  });

  if (isGlobalConfig) {
    // Handle global config
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

    // Remove specified items
    const itemsToRemoveSet = new Set(itemsToRemove);
    const filteredArray = configArray.filter(item => !itemsToRemoveSet.has(item));

    // Only update if something was actually removed
    if (configArray.length !== filteredArray.length) {
      updateProjectsAccessor({
        ...globalConfig,
        [configArrayKey]: filteredArray.sort()
      });
    }
  } else {
    // Handle project config
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

    // Remove specified items
    const itemsToRemoveSet = new Set(itemsToRemove);
    const filteredArray = configArray.filter(item => !itemsToRemoveSet.has(item));

    // Only update if something was actually removed
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

module.exports = removeConfigArrayItems;