/**
 * Installs the Shift+Enter key binding in iTerm2 by updating the GlobalKeyMap preference.
 * Creates a backup before making changes, and restores from backup if installation fails.
 *
 * @async
 * @returns {Promise<string>} Success message with instructions, or throws an error if installation fails.
 * @throws {Error} If backup creation or key binding installation fails, with detailed restoration info.
 */
async function installIterm2ShiftEnterKeyBinding() {
  // Retrieve the current iTerm2 preferences file path (for backup/export)
  const iterm2PreferencesPath = EW1();

  try {
    // Ensure a backup of iTerm2 preferences exists before making changes
    const backupCreated = await exportIterm2DefaultsBackup();
    if (!backupCreated) {
      throw new Error("Failed to create backup of iTerm2 preferences, bailing out");
    }

    // Attempt to write the Shift+Enter key binding to iTerm2'createInteractionAccessor GlobalKeyMap
    const {
      code: writeKeyBindingExitCode
    } = await i0("defaults", [
      "write",
      "com.googlecode.iterm2",
      "GlobalKeyMap",
      "-dict-add",
      "0xd-0x20000-0x24",
      `<dict>
        <key>Text</key>
        <string>\\n</string>
        <key>Action</key>
        <integer>12</integer>
        <key>Version</key>
        <integer>1</integer>
        <key>Keycode</key>
        <integer>13</integer>
        <key>Modifiers</key>
        <integer>131072</integer>
      </dict>`
    ]);

    // If the command failed, throw an error
    if (writeKeyBindingExitCode !== 0) {
      throw new Error("Failed to install iTerm2 Shift+Enter key binding");
    }

    // Export the updated preferences and reset setup progress
    await i0("defaults", ["export", "com.googlecode.iterm2", iterm2PreferencesPath]);
    resetIterm2SetupProgress(); // Reset iTerm2 setup progress flag

    // Return a formatted success message
    return (
      `${FA.ansi256(H4().success)("Installed iTerm2 Shift+Enter key binding")}` +
      `${TQ}` +
      `${FA.dim("See iTerm2 → Preferences → Keys")}` +
      `${TQ}`
    );
  } catch (error) {
    // Log the error
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));

    // Attempt to restore from backup if available
    const backupPath = getCachedOrFreshConfig().iterm2BackupPath;
    let restoredFromBackup = false;
    if (backupPath && f1().existsSync(backupPath)) {
      try {
        await i0("defaults", ["import", "com.googlecode.iterm2", backupPath]);
        restoredFromBackup = true;
        resetIterm2SetupProgress(); // Reset iTerm2 setup progress flag
      } catch (restoreError) {
        reportErrorIfAllowed(new Error(`Failed to restore from backup: ${String(restoreError)}`));
      }
    }

    // Throw a detailed error message with restoration status
    throw new Error(
      `Failed to install iTerm2 Shift+Enter key binding. ` +
      (
        restoredFromBackup
          ? "Your settings have been restored from backup."
          : backupPath && f1().existsSync(backupPath)
            ? `Restoring from backup failed, try manually with: defaults import com.googlecode.iterm2 ${backupPath}`
            : "No backup was available to restore from."
      )
    );
  }
}

module.exports = installIterm2ShiftEnterKeyBinding;