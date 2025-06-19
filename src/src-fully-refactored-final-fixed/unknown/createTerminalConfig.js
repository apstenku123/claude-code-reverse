/**
 * Creates a terminal configuration object with optional custom stdin handling for non-TTY environments.
 *
 * @param {boolean} exitOnCtrlC - Determines if the process should exit on Ctrl+C.
 * @returns {Object} Terminal configuration object with event handlers and optional custom stdin.
 */
function createTerminalConfig(exitOnCtrlC) {
  // Base configuration object
  let terminalConfig = {
    exitOnCtrlC,
    /**
     * Handler for terminal flicker events.
     */
    onFlicker() {
      logTelemetryEventIfEnabled("tengu_flicker", {});
    }
  };

  // If not running in a TTY and not on Windows and not in 'mcp' mode, try to use /dev/tty for stdin
  if (
    !process.stdin.isTTY &&
    !process.argv.includes("mcp") &&
    process.platform !== "win32"
  ) {
    try {
      // Attempt to open /dev/tty for reading
      const ttyFileDescriptor = NU5("/dev/tty", "r");
      terminalConfig = {
        ...terminalConfig,
        stdin: new UU5(ttyFileDescriptor)
      };
    } catch (error) {
      // Handle errors opening /dev/tty
      reportErrorIfAllowed(error);
    }
  }

  return terminalConfig;
}

module.exports = createTerminalConfig;