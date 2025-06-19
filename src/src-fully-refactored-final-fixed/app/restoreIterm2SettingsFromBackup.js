/**
 * Attempts to restore iTerm2 settings from a backup file if a backup is in progress and the backup file exists.
 *
 * @returns {Object} An object indicating the status of the restore operation. Possible statuses: 'no_backup', 'restored', or 'failed'.
 */
function restoreIterm2SettingsFromBackup() {
  // Retrieve the current backup state and backup file path
  const {
    inProgress: isBackupInProgress,
    backupPath: backupFilePath
  } = getIterm2SetupStatus();

  // If there is no backup in progress, return immediately
  if (!isBackupInProgress) {
    return {
      status: "no_backup"
    };
  }

  // If the backup path is missing or the backup file does not exist, reset progress and return
  if (!backupFilePath || !f1().existsSync(backupFilePath)) {
    resetIterm2SetupProgress();
    return {
      status: "no_backup"
    };
  }

  try {
    // Attempt to copy the backup file to the iTerm2 settings location
    f1().copyFileSync(backupFilePath, EW1());
    // Reset the setup progress after successful restore
    resetIterm2SetupProgress();
    return {
      status: "restored"
    };
  } catch (restoreError) {
    // Log the error and reset progress if restore fails
    reportErrorIfAllowed(new Error(`Failed to restore iTerm2 settings with: ${restoreError}`));
    resetIterm2SetupProgress();
    return {
      status: "failed",
      backupPath: backupFilePath
    };
  }
}

module.exports = restoreIterm2SettingsFromBackup;