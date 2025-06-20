/**
 * Creates a configuration object for terminal interaction, handling special cases for non-TTY environments.
 *
 * @param {boolean} exitOnCtrlC - Determines if the process should exit on Ctrl+C.
 * @returns {Object} Configuration object for terminal interaction.
 */
function createTerminalInteractionConfig(exitOnCtrlC) {
  // Initial configuration with exitOnCtrlC and a flicker handler
  let config = {
    exitOnCtrlC,
    onFlicker() {
      // Notify about a terminal flicker event
      logTelemetryEventIfEnabled("tengu_flicker", {});
    }
  };

  // If not running in a TTY and not on Windows, and not in 'mcp' mode
  if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
    if (process.platform !== "win32") {
      try {
        // Attempt to open /dev/tty for direct terminal access
        const ttyDescriptor = NU5("/dev/tty", "r");
        config = {
          ...config,
          stdin: new UU5(ttyDescriptor)
        };
      } catch (error) {
        // Handle any errors opening /dev/tty
        reportErrorIfAllowed(error);
      }
    }
  }

  return config;
}

module.exports = createTerminalInteractionConfig;