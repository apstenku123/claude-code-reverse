/**
 * Initiates the iTerm2 setup process by updating the configuration state and persisting changes.
 *
 * @param {string} backupPath - The file path where the iTerm2 backup should be stored.
 * @returns {void}
 */
function startIterm2Setup(backupPath) {
  // Retrieve the current configuration object (from cache or disk)
  const config = getCachedOrFreshConfig();

  // Mark that the iTerm2 setup process is in progress
  config.iterm2SetupInProgress = true;

  // Store the backup path for iTerm2
  config.iterm2BackupPath = backupPath;

  // Persist the updated configuration
  updateProjectsAccessor(config);
}

module.exports = startIterm2Setup;