/**
 * Determines if the current environment is macOS with a supported terminal,
 * or if the terminal is one of several special supported terminals regardless of OS.
 *
 * External dependencies:
 * - getPlatform: Function that returns the current platform (e.g., 'darwin', 'win32').
 * - environmentInfo: Object containing environment details, specifically the 'terminal' property.
 *
 * @returns {boolean} True if the terminal is supported based on platform and terminal type; otherwise, false.
 */
function isSupportedMacOrSpecialTerminal() {
  // Check if running on macOS
  const isMacOS = getPlatform() === "darwin";

  // List of terminals considered supported on macOS
  const supportedMacTerminals = ["iTerm.app", "Apple_Terminal"];

  // List of terminals supported regardless of platform
  const specialTerminals = ["vscode", "cursor", "windsurf", "ghostty"];

  // Get the current terminal from environment info
  const currentTerminal = environmentInfo.terminal;

  // Check if on macOS and using a supported macOS terminal
  const isMacSupportedTerminal = isMacOS && supportedMacTerminals.includes(currentTerminal);

  // Check if using a special terminal (cross-platform)
  const isSpecialTerminal = specialTerminals.includes(currentTerminal);

  // Return true if either condition is met
  return isMacSupportedTerminal || isSpecialTerminal;
}

module.exports = isSupportedMacOrSpecialTerminal;