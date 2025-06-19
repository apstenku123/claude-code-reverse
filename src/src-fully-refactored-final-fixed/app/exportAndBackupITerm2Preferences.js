/**
 * Exports the iTerm2 preferences plist using the 'defaults' command and creates a backup copy if the file exists.
 * If the export and backup are successful, returns the backup file path. Otherwise, returns null.
 * Logs any errors encountered during the process.
 *
 * @async
 * @returns {Promise<string|null>} The path to the backup file if successful, or null if not.
 */
async function exportAndBackupITerm2Preferences() {
  // Get the full path to the iTerm2 preferences plist file
  const preferencesPlistPath = getITerm2PreferencesPlistPath();
  // Define the backup file path
  const backupPlistPath = `${preferencesPlistPath}.bak`;
  try {
    // Export the current iTerm2 preferences using the 'defaults' command
    await i0("defaults", ["export", "com.googlecode.iterm2", preferencesPlistPath]);
    // Check if the preferences file exists
    if (getBm9Value().existsSync(preferencesPlistPath)) {
      // Copy the preferences file to create a backup
      getBm9Value().copyFileSync(preferencesPlistPath, backupPlistPath);
      // Perform any additional processing on the backup file
      startIterm2Setup(backupPlistPath);
      return backupPlistPath;
    }
    // If the preferences file does not exist, return null
    return null;
  } catch (error) {
    // Log the error using the provided error handler
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

module.exports = exportAndBackupITerm2Preferences;