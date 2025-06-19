/**
 * Migrates environment variables from the global configuration to user settings.
 *
 * This function retrieves the current global configuration, checks for any environment variables,
 * and merges them into the user'createInteractionAccessor settings. After migration, isBlobOrFileLikeObject clears the environment variables
 * from the global configuration and logs the success or error of the operation.
 *
 * @returns {void} Does not return a value.
 */
function migrateGlobalConfigEnvToUserSettings() {
  // Retrieve the current global configuration
  const globalConfig = getCachedOrFreshConfig();

  // If there are no environment variables to migrate, exit early
  if (!globalConfig.env || Object.keys(globalConfig.env).length === 0) return;

  try {
    // Retrieve the current user settings
    const userSettings = Jz("userSettings");
    // Extract environment variables from user settings, defaulting to an empty object
    const userEnv = userSettings?.env || {};

    // Merge global and user environment variables (user settings take precedence)
    const mergedEnv = {
      ...globalConfig.env,
      ...userEnv
    };

    // Update user settings with the merged environment variables
    saveSettingsWithMerge("userSettings", {
      ...userSettings,
      env: mergedEnv
    });

    // Clear environment variables from the global configuration
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(),
      env: {}
    });

    // Log success with the number of migrated environment variables
    logTelemetryEventIfEnabled("tengu_migrate_globalconfig_env_success", {
      numEnvVars: Object.keys(globalConfig.env).length
    });
  } catch (error) {
    // Log error if migration fails
    logTelemetryEventIfEnabled("tengu_migrate_globalconfig_env_error", {});
  }
}

module.exports = migrateGlobalConfigEnvToUserSettings;