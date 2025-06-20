/**
 * Determines if the current terminal is one of the supported terminals on macOS or is a supported terminal on any platform.
 *
 * This function checks if the current operating system is macOS ("darwin") and the terminal is either "iTerm.app" or "Apple_Terminal".
 * It also checks for other supported terminals ("vscode", "cursor", "windsurf", "ghostty") regardless of the platform.
 *
 * @returns {boolean} True if the terminal is supported, false otherwise.
 */
function isSupportedTerminalOnMac() {
  // Get the current platform (e.g., 'darwin', 'win32', 'linux')
  const currentPlatform = UW1();

  // Get the current terminal information
  const terminalInfo = pA;

  // List of terminals supported only on macOS
  const macOnlyTerminals = ["iTerm.app", "Apple_Terminal"];

  // List of terminals supported on any platform
  const crossPlatformTerminals = ["vscode", "cursor", "windsurf", "ghostty"];

  // Check if running on macOS and using a mac-only supported terminal
  const isMacSupportedTerminal =
    currentPlatform === "darwin" &&
    macOnlyTerminals.includes(terminalInfo.terminal);

  // Check if using a cross-platform supported terminal
  const isCrossPlatformTerminal =
    crossPlatformTerminals.includes(terminalInfo.terminal);

  // Return true if any supported terminal is detected
  return isMacSupportedTerminal || isCrossPlatformTerminal;
}

module.exports = isSupportedTerminalOnMac;