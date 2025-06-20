/**
 * Deletes a configuration key from either the global or local configuration.
 *
 * This function attempts to delete a configuration key, either from the global
 * configuration or the local project configuration, depending on the `isGlobal`
 * flag. It validates whether the key is allowed to be deleted in the respective
 * context, logs errors and exits the process if not, and updates the configuration
 * storage after deletion.
 *
 * @param {string} configKey - The configuration key to delete.
 * @param {boolean} isGlobal - If true, deletes from the global configuration; otherwise, from the local configuration.
 * @returns {void}
 */
function deleteConfigKey(configKey, isGlobal) {
  // Notify the system about the delete action (side effect, e.g., for analytics or hooks)
  logTelemetryEventIfEnabled("tengu_config_delete", {
    key: configKey,
    global: isGlobal
  });

  if (isGlobal) {
    // Validate if the key can be deleted from the global config
    if (!Ry1(configKey)) {
      console.error(
        `Error: Cannot delete '${configKey}'. Only these keys can be modified: ${pn.join(", ")}`
      );
      process.exit(1);
    }
    // Retrieve the current global configuration
    const globalConfig = getCachedOrFreshConfig();
    // Delete the specified key
    delete globalConfig[configKey];
    // Persist the updated global configuration
    updateProjectsAccessor(globalConfig);
  } else {
    // Validate if the key can be deleted from the local config
    if (!Oy1(configKey)) {
      console.error(
        `Error: Cannot delete '${configKey}'. Only these keys can be modified: ${cn.join(", ")}. Did you mean --global?`
      );
      process.exit(1);
    }
    // Retrieve the current local configuration
    const localConfig = getProjectSubscriptionConfig();
    // Delete the specified key
    delete localConfig[configKey];
    // Persist the updated local configuration
    updateProjectInConfig(localConfig);
  }
}

module.exports = deleteConfigKey;