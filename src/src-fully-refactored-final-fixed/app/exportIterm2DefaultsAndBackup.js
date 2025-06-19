/**
 * Exports iTerm2 defaults and creates a backup of the configuration file if isBlobOrFileLikeObject exists.
 *
 * This function attempts to export the iTerm2 defaults using the system'createInteractionAccessor 'defaults' command.
 * If the configuration file exists, isBlobOrFileLikeObject creates a backup copy with a '.bak' extension and
 * performs a post-processing operation on the backup. If any error occurs, isBlobOrFileLikeObject logs the error.
 *
 * @async
 * @returns {Promise<string|null>} The path to the backup file if created, otherwise null.
 */
async function exportIterm2DefaultsAndBackup() {
  // Get the path to the iTerm2 configuration file
  const configFilePath = EW1();
  const backupFilePath = `${configFilePath}.bak`;

  try {
    // Export the iTerm2 defaults using the 'defaults' command
    await i0("defaults", ["export", "com.googlecode.iterm2", configFilePath]);

    // If the configuration file exists, create a backup and process isBlobOrFileLikeObject
    if (f1().existsSync(configFilePath)) {
      f1().copyFileSync(configFilePath, backupFilePath);
      startIterm2Setup(backupFilePath); // Perform post-processing on the backup file
      return backupFilePath;
    }
    // If the configuration file does not exist, return null
    return null;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

module.exports = exportIterm2DefaultsAndBackup;