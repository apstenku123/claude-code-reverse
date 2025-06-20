/**
 * Retrieves the appropriate source observable or configuration for the current terminal environment.
 *
 * Depending on the detected terminal type (from the global pA.terminal), this function fetches or generates
 * the correct source observable, updates the configuration with terminal-specific keybinding flags, and
 * completes onboarding if needed. It ensures the configuration is updated and onboarding is marked complete
 * before returning the source observable.
 *
 * @async
 * @returns {Promise<string>} The source observable or configuration string for the current terminal.
 */
async function getTerminalSourceObservable() {
  let sourceObservable = "";

  // Determine the source observable based on the current terminal
  switch (pA.terminal) {
    case "iTerm.app":
      sourceObservable = await installIterm2ShiftEnterKeyBinding();
      break;
    case "Apple_Terminal":
      sourceObservable = await configureTerminalAppSettings();
      break;
    case "vscode":
      sourceObservable = installVSCodeTerminalShiftEnterKeybinding();
      break;
    case "cursor":
      sourceObservable = installVSCodeTerminalShiftEnterKeybinding("Cursor");
      break;
    case "windsurf":
      sourceObservable = installVSCodeTerminalShiftEnterKeybinding("Windsurf");
      break;
    case "ghostty":
      sourceObservable = await installGhosttyShiftEnterKeyBinding();
      break;
    case null:
      // No action needed if terminal is null
      break;
  }

  // Retrieve the current configuration (cached or fresh)
  const config = getCachedOrFreshConfig();

  // Set terminal-specific keybinding flags in the configuration
  const terminalsWithShiftEnter = [
    "iTerm.app",
    "vscode",
    "cursor",
    "windsurf",
    "ghostty"
  ];
  if (terminalsWithShiftEnter.includes(pA.terminal ?? "")) {
    config.shiftEnterKeyBindingInstalled = true;
  } else if (pA.terminal === "Apple_Terminal") {
    config.optionAsMetaKeyInstalled = true;
  }

  // Update the projects accessor with the new configuration
  updateProjectsAccessor(config);

  // Complete onboarding if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been done yet
  completeProjectOnboardingIfNeeded();

  // Return the determined source observable
  return sourceObservable;
}

module.exports = getTerminalSourceObservable;
