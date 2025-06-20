/**
 * Determines if the current terminal environment is one of the supported terminals on macOS (Darwin),
 * including iTerm.app, Apple_Terminal, vscode, cursor, windsurf, or ghostty.
 *
 * Relies on external functions/objects:
 *   - getPlatform(): Returns the current platform string (e.g., 'darwin', 'win32', etc.)
 *   - processAttributes: An object containing the current terminal'createInteractionAccessor name in the 'terminal' property
 *
 * @returns {boolean} True if the terminal is one of the supported terminals, false otherwise.
 */
function isWindsurfCompatibleTerminal() {
  // List of supported terminal names
  const supportedTerminals = [
    "iTerm.app",
    "Apple_Terminal",
    "vscode",
    "cursor",
    "windsurf",
    "ghostty"
  ];

  // Check if the current platform is macOS (darwin)
  const isMacOS = getPlatform() === "darwin";

  // Get the current terminal name
  const currentTerminal = processAttributes.terminal;

  // If on macOS, check for iTerm.app or Apple_Terminal
  if (isMacOS && (currentTerminal === "iTerm.app" || currentTerminal === "Apple_Terminal")) {
    return true;
  }

  // Check for other supported terminals regardless of platform
  if (["vscode", "cursor", "windsurf", "ghostty"].includes(currentTerminal)) {
    return true;
  }

  // Terminal is not supported
  return false;
}

module.exports = isWindsurfCompatibleTerminal;