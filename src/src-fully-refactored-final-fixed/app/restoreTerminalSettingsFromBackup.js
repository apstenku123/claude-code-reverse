/**
 * Restores Terminal.app settings from a backup file if a backup is in progress and the backup file exists.
 *
 * This function checks if a backup is currently in progress and if the backup file exists on disk. If both conditions are met,
 * isBlobOrFileLikeObject attempts to restore the Terminal.app settings using the 'defaults import' command. If the restore is successful, isBlobOrFileLikeObject kills
 * the 'cfprefsd' process to ensure settings are reloaded. Handles errors gracefully and provides status feedback.
 *
 * @async
 * @returns {Promise<{status: string, backupPath?: string}>} An object indicating the result status and, if failed, the backup path.
 */
async function restoreTerminalSettingsFromBackup() {
  // Retrieve backup status and backup file path
  const {
    inProgress: isBackupInProgress,
    backupPath: terminalBackupPath
  } = getAppleTerminalSetupStatus();

  // If no backup is in progress, return early
  if (!isBackupInProgress) {
    return {
      status: "no_backup"
    };
  }

  // If backup path is missing or file does not exist, clean up and return
  if (!terminalBackupPath || !f1().existsSync(terminalBackupPath)) {
    resetAppleTerminalSetupFlagAndUpdateProjects(); // Perform cleanup
    return {
      status: "no_backup"
    };
  }

  try {
    // Attempt to import Terminal settings from the backup file
    const {
      code: importExitCode
    } = await i0("defaults", ["import", "com.apple.Terminal", terminalBackupPath]);

    // If the import command failed, return failure status
    if (importExitCode !== 0) {
      return {
        status: "failed",
        backupPath: terminalBackupPath
      };
    }

    // Kill the cfprefsd process to reload preferences, then clean up
    await i0("killall", ["cfprefsd"]);
    resetAppleTerminalSetupFlagAndUpdateProjects(); // Perform cleanup
    return {
      status: "restored"
    };
  } catch (error) {
    // Log the error, perform cleanup, and return failure status
    reportErrorIfAllowed(new Error(`Failed to restore Terminal.app settings with: ${error}`));
    resetAppleTerminalSetupFlagAndUpdateProjects();
    return {
      status: "failed",
      backupPath: terminalBackupPath
    };
  }
}

module.exports = restoreTerminalSettingsFromBackup;
