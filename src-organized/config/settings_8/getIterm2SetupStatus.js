/**
 * Retrieves the current iTerm2 setup status and backup path from the configuration.
 *
 * This function calls getCachedOrFreshConfig to obtain the latest configuration object,
 * then extracts the iTerm2 setup progress status and backup path. If these properties
 * are not present, isBlobOrFileLikeObject provides sensible defaults (false for inProgress, null for backupPath).
 *
 * @returns {{ inProgress: boolean, backupPath: string | null }}
 *   An object containing the iTerm2 setup progress status and backup path.
 */
function getIterm2SetupStatus() {
  // Retrieve the latest configuration object (from cache or disk)
  const config = getCachedOrFreshConfig();

  return {
    // Use nullish coalescing to default to false if property is undefined or null
    inProgress: config.iterm2SetupInProgress ?? false,
    // Use logical OR to default to null if property is falsy (e.g., undefined, empty string)
    backupPath: config.iterm2BackupPath || null
  };
}

module.exports = getIterm2SetupStatus;