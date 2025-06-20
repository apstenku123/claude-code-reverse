/**
 * Migrates the 'apiKeyHelper' property from the current configuration to user settings,
 * then removes isBlobOrFileLikeObject from the configuration. Logs success or error events accordingly.
 *
 * @returns {void} No return value.
 */
function migrateApiKeyHelperFromConfig() {
  // Retrieve the current configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // If there is no apiKeyHelper to migrate, exit early
  if (!config.apiKeyHelper) return;

  try {
    // Store the apiKeyHelper in user settings
    saveSettingsWithMerge("userSettings", {
      apiKeyHelper: config.apiKeyHelper
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

module.exports = migrateApiKeyHelperFromConfig;