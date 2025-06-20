/**
 * Determines if the current terminal is a supported terminal on macOS or one of several specific terminals.
 *
 * This function checks if the operating system is macOS ("darwin") and the terminal is either iTerm.app or Apple_Terminal,
 * or if the terminal is one of: vscode, cursor, windsurf, or ghostty.
 *
 * @returns {boolean} True if the terminal is supported, otherwise false.
 */
function isSupportedMacTerminal() {
  // Retrieve the current operating system platform
  const platform = UW1();

  // Retrieve the current terminal information
  const terminalInfo = pA.terminal;

  // Check if the platform is macOS and the terminal is iTerm.app or Apple_Terminal
  const isMacAndSupportedTerminal =
    platform === "darwin" &&
    (terminalInfo === "iTerm.app" || terminalInfo === "Apple_Terminal");

  // Check if the terminal is one of the other supported terminals
  const isOtherSupportedTerminal =
    terminalInfo === "vscode" ||
    terminalInfo === "cursor" ||
    terminalInfo === "windsurf" ||
    terminalInfo === "ghostty";

  // Return true if any of the above conditions are met
  return isMacAndSupportedTerminal || isOtherSupportedTerminal;
}

module.exports = isSupportedMacTerminal;