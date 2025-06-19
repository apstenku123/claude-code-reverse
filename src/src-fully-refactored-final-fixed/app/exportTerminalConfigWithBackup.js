/**
 * Exports the current Terminal configuration and creates a backup if the export is successful.
 *
 * This function attempts to export the current Terminal configuration using the 'defaults' command.
 * If the export is successful (exit code 0), and the configuration file exists, isBlobOrFileLikeObject creates a backup
 * of the configuration file with a '.bak' extension. If any errors occur during the process, they
 * are logged using the provided error handler.
 *
 * @async
 * @returns {Promise<string|null>} The path to the backup file if created, otherwise null.
 */
async function exportTerminalConfigWithBackup() {
  // Get the path to the Terminal configuration file
  const terminalConfigPath = Am();
  const backupConfigPath = `${terminalConfigPath}.bak`;

  try {
    // Attempt to export the Terminal configuration using the 'defaults' command
    const { code: exportExitCode } = await i0("defaults", ["export", "com.apple.Terminal", terminalConfigPath]);

    // If the export command failed, return null
    if (exportExitCode !== 0) {
      return null;
    }

    // If the configuration file exists, create a backup and return the backup path
    if (f1().existsSync(terminalConfigPath)) {
      await i0("defaults", ["export", "com.apple.Terminal", backupConfigPath]);
      setAppleTerminalSetupInProgress(backupConfigPath);
      return backupConfigPath;
    }

    // If the configuration file does not exist, return null
    return null;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

module.exports = exportTerminalConfigWithBackup;