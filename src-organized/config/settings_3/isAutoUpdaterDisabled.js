/**
 * Determines if the application'createInteractionAccessor auto-updater functionality is disabled.
 *
 * Checks for environment variables or configuration settings that indicate
 * whether the auto-updater should be disabled. This is useful for environments
 * where automatic updates are not desired or should be prevented.
 *
 * @returns {boolean} Returns true if the auto-updater is disabled by environment variables or configuration; otherwise, false.
 */
function isAutoUpdaterDisabled() {
  // Check if either environment variable disables the auto-updater
  const isDisabledByEnv = Boolean(
    process.env.DISABLE_AUTOUPDATER ||
    process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC
  );

  // Retrieve configuration object (from cache or fresh)
  const config = getCachedOrFreshConfig();

  // Check if the configuration explicitly disables the auto-updater
  const isDisabledByConfig = config.autoUpdaterStatus === "disabled";

  // Return true if any disabling condition is met
  return isDisabledByEnv || isDisabledByConfig;
}

module.exports = isAutoUpdaterDisabled;