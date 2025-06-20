/**
 * Initiates the iTerm2 setup process by updating the configuration state and setting the backup path.
 *
 * @param {string} backupPath - The file path where the iTerm2 backup should be stored.
 * @returns {void}
 *
 * This function retrieves the current configuration (from cache or fresh), marks that the iTerm2 setup is in progress,
 * sets the backup path, and updates the projects accessor with the modified configuration.
 */
function startIterm2SetupWithBackupPath(backupPath) {
  // Retrieve the current configuration object (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Mark that the iTerm2 setup process is in progress
  config.iterm2SetupInProgress = true;

  // Set the backup path for iTerm2
  config.iterm2BackupPath = backupPath;

  // Update the projects accessor with the modified configuration
  updateProjectsAccessor(config);
}

module.exports = startIterm2SetupWithBackupPath;