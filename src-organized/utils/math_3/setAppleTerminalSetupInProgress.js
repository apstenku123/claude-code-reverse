/**
 * Sets the appleTerminalSetupInProgress flag to true and updates the backup path in the configuration,
 * then persists the updated configuration using the projects accessor updater.
 *
 * @param {string} backupPath - The file path to be used as the Apple Terminal backup path.
 * @returns {void}
 */
function setAppleTerminalSetupInProgress(backupPath) {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();
  // Indicate that Apple Terminal setup is in progress
  config.appleTerminalSetupInProgress = true;
  // Set the backup path for Apple Terminal
  config.appleTerminalBackupPath = backupPath;
  // Persist the updated configuration
  updateProjectsAccessor(config);
}

module.exports = setAppleTerminalSetupInProgress;