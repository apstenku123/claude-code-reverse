/**
 * Retrieves the current Apple Terminal setup status and backup path from the configuration.
 *
 * This function fetches the latest configuration (from cache or disk),
 * then extracts and returns the status of the Apple Terminal setup process
 * and the path to the backup, if available.
 *
 * @returns {Object} An object containing:
 *   - inProgress {boolean}: Whether the Apple Terminal setup is currently in progress.
 *   - backupPath {string|null}: The path to the Apple Terminal backup, or null if not set.
 */
function getAppleTerminalSetupStatus() {
  // Retrieve the configuration object (from cache or disk)
  const config = getCachedOrFreshConfig();

  return {
    // Use nullish coalescing to default to false if undefined or null
    inProgress: config.appleTerminalSetupInProgress ?? false,
    // Use logical OR to default to null if falsy
    backupPath: config.appleTerminalBackupPath || null
  };
}

module.exports = getAppleTerminalSetupStatus;