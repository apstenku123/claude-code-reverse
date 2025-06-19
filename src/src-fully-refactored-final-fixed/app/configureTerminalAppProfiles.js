/**
 * Configures Terminal.app profiles by enabling the "Option as Meta key" and disabling the audio bell (switching to visual bell).
 * Backs up preferences, modifies settings for default and startup profiles, and handles errors with restoration from backup if needed.
 *
 * @async
 * @returns {Promise<string>} Success message describing the changes made.
 * @throws {Error} If backup, read, or configuration fails, with details and restoration instructions if possible.
 */
async function configureTerminalAppProfiles() {
  try {
    // Step 1: Backup Terminal.app preferences
    const backupSuccess = await exportTerminalDefaultsWithBackup();
    if (!backupSuccess) {
      throw new Error("Failed to create backup of Terminal.app preferences, bailing out");
    }

    // Step 2: Read the default Terminal profile
    const {
      stdout: defaultProfileNameRaw,
      code: defaultProfileReadCode
    } = await i0("defaults", ["read", "com.apple.Terminal", "Default Window Settings"]);
    if (defaultProfileReadCode !== 0 || !defaultProfileNameRaw.trim()) {
      throw new Error("Failed to read default Terminal.app profile");
    }
    const defaultProfileName = defaultProfileNameRaw.trim();

    // Step 3: Read the startup Terminal profile
    const {
      stdout: startupProfileNameRaw,
      code: startupProfileReadCode
    } = await i0("defaults", ["read", "com.apple.Terminal", "Startup Window Settings"]);
    if (startupProfileReadCode !== 0 || !startupProfileNameRaw.trim()) {
      throw new Error("Failed to read startup Terminal.app profile");
    }
    const startupProfileName = startupProfileNameRaw.trim();

    // Step 4: Attempt to enable Option as Meta key and disable audio bell for default profile
    let anyProfileModified = false;
    const optionAsMetaEnabledDefault = await di0(defaultProfileName);
    const audioBellDisabledDefault = await disableTerminalProfileAudioBell(defaultProfileName);
    if (optionAsMetaEnabledDefault || audioBellDisabledDefault) {
      anyProfileModified = true;
    }

    // Step 5: If startup profile is different, attempt to modify isBlobOrFileLikeObject as well
    if (startupProfileName !== defaultProfileName) {
      const optionAsMetaEnabledStartup = await di0(startupProfileName);
      const audioBellDisabledStartup = await disableTerminalProfileAudioBell(startupProfileName);
      if (optionAsMetaEnabledStartup || audioBellDisabledStartup) {
        anyProfileModified = true;
      }
    }

    // Step 6: If no profile was modified, throw an error
    if (!anyProfileModified) {
      throw new Error("Failed to enable Option as Meta key or disable audio bell for any Terminal.app profile");
    }

    // Step 7: Reload preferences and return success message
    await i0("killall", ["cfprefsd"]);
    resetAppleTerminalSetupFlagAndUpdateProjects(); // Possibly a notification or side effect
    return (
      `${FA.ansi256(H4().success)("Configured Terminal.app settings:")}` +
      TQ +
      `${FA.ansi256(H4().success)('- Enabled "Use Option as Meta key"')}` +
      TQ +
      `${FA.ansi256(H4().success)("- Switched to visual bell")}` +
      TQ +
      `${FA.dim("Option+Enter will now enter a newline.")}` +
      TQ +
      `${FA.dim("You must restart Terminal.app for changes to take effect.")}` +
      TQ
    );
  } catch (error) {
    // Log the error
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    // Attempt to restore from backup
    const restoreStatus = await restoreTerminalSettingsFromBackup();
    const failureMessage = "Failed to enable Option as Meta key for Terminal.app.";
    if (restoreStatus.status === "restored") {
      throw new Error(`${failureMessage} Your settings have been restored from backup.`);
    } else if (restoreStatus.status === "failed") {
      throw new Error(`${failureMessage} Restoring from backup failed, try manually with: defaults import com.apple.Terminal ${restoreStatus.backupPath}`);
    } else {
      throw new Error(`${failureMessage} No backup was available to restore from.`);
    }
  }
}

module.exports = configureTerminalAppProfiles;