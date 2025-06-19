/**
 * Returns a user-friendly hint for how to insert a newline in the terminal, based on environment and configuration.
 *
 * The function checks if the terminal is enabled and which terminal is being used, as well as configuration flags
 * for modifier keys. It returns a string describing the keyboard shortcut for inserting a newline.
 *
 * @returns {string} a string describing the keyboard shortcut for inserting a newline in the terminal.
 */
function getNewlineShortcutHint() {
  // Check if the terminal feature is enabled
  const isTerminalEnabled = Uw.isEnabled();
  // Get the current terminal type
  const terminalType = pA.terminal;
  // Check if the 'option as meta key' feature is installed
  const isOptionAsMetaKeyInstalled = isOptionAsMetaKeyInstalled();
  // Check if the 'shift for newline' feature is enabled
  const isShiftForNewlineEnabled = isShiftEnterKeyBindingInstalled();
  // Check if the 'backslash for newline' feature is enabled
  const isBackslashForNewlineEnabled = hasUsedBackslashReturn();

  // If using Apple Terminal and 'option as meta key' is installed, show the Option shortcut
  if (isTerminalEnabled && terminalType === "Apple_Terminal" && isOptionAsMetaKeyInstalled) {
    return "option + ⏎ for newline";
  }

  // If Shift+Enter is enabled, show that shortcut
  if (isTerminalEnabled && isShiftForNewlineEnabled) {
    return "shift + ⏎ for newline";
  }

  // Otherwise, show the backslash shortcut (escaped for display)
  return isBackslashForNewlineEnabled
    ? "\\⏎ for newline"
    : "backslash (\\) + return (⏎) for newline";
}

module.exports = getNewlineShortcutHint;