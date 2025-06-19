/**
 * Migrates the apiKeyHelper property from the current configuration to user settings,
 * then removes isBlobOrFileLikeObject from the configuration. Logs success or error events accordingly.
 *
 * @returns {void} No return value.
 */
function migrateApiKeyHelper() {
  // Retrieve the current configuration (from cache or fresh)
  const config = getCachedOrFreshConfig();

  // If apiKeyHelper does not exist, exit early
  if (!config.apiKeyHelper) return;

  try {
    // Save apiKeyHelper to user settings
    saveSettingsWithMerge("userSettings", {
      apiKeyHelper: config.apiKeyHelper
    });

    // Remove apiKeyHelper from the configuration and update the accessor
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(), // Get the latest config again in case isBlobOrFileLikeObject changed
      apiKeyHelper: undefined
    });

    // Log success event
    logTelemetryEventIfEnabled("tengu_migrate_apikeyhelper_success", {});
  } catch (error) {
    // Log error event if migration fails
    logTelemetryEventIfEnabled("tengu_migrate_apikeyhelper_error", {});
  }
}

module.exports = migrateApiKeyHelper;