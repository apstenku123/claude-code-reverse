/**
 * Checks if the current terminal is one of the supported terminals on macOS (Darwin).
 *
 * Supported terminals:
 *   - iTerm.app
 *   - Apple_Terminal
 *   - vscode
 *   - cursor
 *   - windsurf
 *   - ghostty
 *
 * @returns {boolean} True if the current terminal matches one of the supported terminals on macOS, false otherwise.
 */
function isSupportedTerminalOnDarwin() {
  // Retrieve the current operating system platform
  const platform = UW1();

  // Retrieve the current terminal name from the environment
  const terminalName = pA.terminal;

  // List of supported terminal names
  const supportedTerminalsOnDarwin = ["iTerm.app", "Apple_Terminal"];
  const supportedTerminalsAnyPlatform = ["vscode", "cursor", "windsurf", "ghostty"];

  // Check if running on macOS and using a supported terminal
  const isDarwinWithSupportedTerminal =
    platform === "darwin" && supportedTerminalsOnDarwin.includes(terminalName);

  // Check if using a supported terminal on any platform
  const isSupportedTerminal =
    supportedTerminalsAnyPlatform.includes(terminalName);

  // Return true if either condition is met
  return isDarwinWithSupportedTerminal || isSupportedTerminal;
}

module.exports = isSupportedTerminalOnDarwin;