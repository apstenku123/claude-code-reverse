/**
 * Exports the current Terminal app defaults to a file and creates a backup if the export is successful.
 *
 * This function attempts to export the Terminal app'createInteractionAccessor preferences using the 'defaults' command. If the export is successful (exit code 0),
 * and the exported file exists, isBlobOrFileLikeObject creates a backup of the exported file with a '.bak' extension. If any step fails, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @returns {Promise<string|null>} The path to the backup file if successful, or null if the operation fails.
 */
async function exportTerminalDefaultsWithBackup() {
  // Get the path where the Terminal defaults will be exported
  const exportPath = Am();
  const backupPath = `${exportPath}.bak`;

  try {
    // Attempt to export Terminal defaults to the exportPath
    const { code: exitCode } = await i0("defaults", ["export", "com.apple.Terminal", exportPath]);

    // If the export command failed, return null
    if (exitCode !== 0) return null;

    // If the export file exists, create a backup and perform post-processing
    if (f1().existsSync(exportPath)) {
      await i0("defaults", ["export", "com.apple.Terminal", backupPath]);
      setAppleTerminalSetupInProgress(backupPath); // Post-processing on the backup file
      return backupPath;
    }

    // If the export file does not exist, return null
    return null;
  } catch (error) {
    // Log the error using reportErrorIfAllowed and return null
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

module.exports = exportTerminalDefaultsWithBackup;