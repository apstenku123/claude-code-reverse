/**
 * Migrates the apiKeyHelper property from the current configuration to user settings.
 *
 * This function checks if the apiKeyHelper exists in the current configuration. If isBlobOrFileLikeObject does,
 * isBlobOrFileLikeObject saves isBlobOrFileLikeObject to the user settings, removes isBlobOrFileLikeObject from the configuration, and logs a success event.
 * If any error occurs during this process, isBlobOrFileLikeObject logs an error event.
 *
 * @returns {void} Does not return a value.
 */
function migrateApiKeyHelperToUserSettings() {
  // Retrieve the current configuration (from cache or disk)
  const currentConfig = getCachedOrFreshConfig();

  // If apiKeyHelper is not present, exit early
  if (!currentConfig.apiKeyHelper) return;

  try {
    // Save apiKeyHelper to user settings
    saveSettingsWithMerge("userSettings", {
      apiKeyHelper: currentConfig.apiKeyHelper
    });

    // Remove apiKeyHelper from the configuration and update the accessor
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(),
      apiKeyHelper: undefined
    });

    // Log a successful migration event
    logTelemetryEventIfEnabled("tengu_migrate_apikeyhelper_success", {});
  } catch (error) {
    // Log an error event if migration fails
    logTelemetryEventIfEnabled("tengu_migrate_apikeyhelper_error", {});
  }
}

module.exports = migrateApiKeyHelperToUserSettings;