/**
 * Configures macOS Terminal.app settings to enable "Option as Meta key" and disable the audio bell (switch to visual bell).
 * Backs up current preferences, applies changes, and handles error recovery with backup restoration if needed.
 *
 * @async
 * @returns {Promise<string>} Success message describing the changes made.
 * @throws {Error} If backup, read, or configuration steps fail. Attempts to restore from backup on failure.
 */
async function configureTerminalAppSettings() {
  try {
    // Step 1: Backup Terminal.app preferences
    const backupSuccessful = await exportTerminalDefaultsWithBackup();
    if (!backupSuccessful) {
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

    // Step 4: Attempt to enable Option as Meta key or disable audio bell for the default profile
    let settingsChanged = false;
    const optionAsMetaEnabledDefault = await di0(defaultProfileName);
    const audioBellDisabledDefault = await disableTerminalProfileAudioBell(defaultProfileName);
    if (optionAsMetaEnabledDefault || audioBellDisabledDefault) {
      settingsChanged = true;
    }

    // Step 5: If startup profile is different, attempt to enable for that as well
    if (startupProfileName !== defaultProfileName) {
      const optionAsMetaEnabledStartup = await di0(startupProfileName);
      const audioBellDisabledStartup = await disableTerminalProfileAudioBell(startupProfileName);
      if (optionAsMetaEnabledStartup || audioBellDisabledStartup) {
        settingsChanged = true;
      }
    }

    // Step 6: If no settings were changed, throw error
    if (!settingsChanged) {
      throw new Error("Failed to enable Option as Meta key or disable audio bell for any Terminal.app profile");
    }

    // Step 7: Reload preferences and show success message
    await i0("killall", ["cfprefsd"]);
    resetAppleTerminalSetupFlagAndUpdateProjects(); // Possibly triggers a UI update or notification
    return (
      `${FA.ansi256(H4().success)("Configured Terminal.app settings:")}` +
      `${TQ}` +
      `${FA.ansi256(H4().success)('- Enabled "Use Option as Meta key"')}` +
      `${TQ}` +
      `${FA.ansi256(H4().success)("- Switched to visual bell")}` +
      `${TQ}` +
      `${FA.dim("Option+Enter will now enter a newline.")}` +
      `${TQ}` +
      `${FA.dim("You must restart Terminal.app for changes to take effect.")}` +
      `${TQ}`
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

module.exports = configureTerminalAppSettings;