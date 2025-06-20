/**
 * Creates a configuration object for handling standard input (stdin) behavior in a CLI environment.
 * Optionally attaches a custom stdin stream if running on a non-Windows platform without a TTY and not in 'mcp' mode.
 * Also provides a callback for handling flicker events.
 *
 * @param {boolean} exitOnCtrlC - Determines if the process should exit on Ctrl+C.
 * @returns {Object} Configuration object for stdin handling and flicker events.
 */
function createStdinConfig(exitOnCtrlC) {
  // Base configuration object
  let config = {
    exitOnCtrlC,
    /**
     * Callback for handling flicker events.
     */
    onFlicker() {
      logTelemetryEventIfEnabled("tengu_flicker", {});
    }
  };

  // If not running in a TTY, not in 'mcp' mode, and not on Windows, attach a custom stdin stream
  if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
    if (process.platform !== "win32") {
      try {
        // Open /dev/tty for reading
        const ttyFileDescriptor = NU5("/dev/tty", "r");
        config = {
          ...config,
          stdin: new UU5(ttyFileDescriptor)
        };
      } catch (error) {
        // Handle any errors that occur while opening /dev/tty
        reportErrorIfAllowed(error);
      }
    }
  }

  return config;
}

module.exports = createStdinConfig;