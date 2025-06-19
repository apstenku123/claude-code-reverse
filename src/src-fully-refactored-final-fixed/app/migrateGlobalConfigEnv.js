/**
 * Migrates environment variables from the global configuration to user settings, then clears them from the global config.
 *
 * This function retrieves the current global configuration, merges its environment variables with those from user settings (if any),
 * updates the user settings with the merged environment, clears the environment in the global config, and logs the outcome.
 *
 * @returns {void} Does not return a value.
 */
function migrateGlobalConfigEnv() {
  // Retrieve the current global configuration
  const globalConfig = getCachedOrFreshConfig();

  // If there are no environment variables to migrate, exit early
  if (!globalConfig.env || Object.keys(globalConfig.env).length === 0) {
    return;
  }

  try {
    // Retrieve user settings configuration
    const userSettingsConfig = Jz("userSettings");
    // Extract environment variables from user settings, defaulting to empty object
    const userSettingsEnv = userSettingsConfig?.env || {};

    // Merge global and user settings environment variables (user settings take precedence)
    const mergedEnv = {
      ...globalConfig.env,
      ...userSettingsEnv
    };

    // Update user settings with the merged environment variables
    saveSettingsWithMerge("userSettings", {
      ...userSettingsConfig,
      env: mergedEnv
    });

    // Clear environment variables from the global configuration
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(),
      env: {}
    });

    // Log success event with the number of migrated environment variables
    logTelemetryEventIfEnabled("tengu_migrate_globalconfig_env_success", {
      numEnvVars: Object.keys(globalConfig.env).length
    });
  } catch (error) {
    // Log error event if migration fails
    logTelemetryEventIfEnabled("tengu_migrate_globalconfig_env_error", {});
  }
}

module.exports = migrateGlobalConfigEnv;