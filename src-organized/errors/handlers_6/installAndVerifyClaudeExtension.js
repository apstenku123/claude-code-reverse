/**
 * Attempts to install the Claude Code extension and verify its installation status.
 * Updates configuration if necessary and logs installation or error events.
 *
 * @async
 * @returns {Promise<{installed: boolean, error: string|null, installedVersion: any}>} 
 *   An object indicating installation status, error message (if any), and installed version.
 */
async function installAndVerifyClaudeExtension() {
  // Check if extension installation is allowed or possible
  if (!qw()) {
    return null;
  }
  try {
    // Attempt to install the Claude Code extension
    const installedVersion = await installClaudeCodeExtension();

    // Log successful installation event
    logTelemetryEventIfEnabled("tengu_ext_installed", {});

    // Retrieve current configuration (from cache or disk)
    const config = getCachedOrFreshConfig();

    // If diffTool is not set, update configuration to use 'auto'
    if (!config.diffTool) {
      updateProjectsAccessor({
        ...config,
        diffTool: "auto"
      });
    }

    // Return successful installation result
    return {
      installed: true,
      error: null,
      installedVersion
    };
  } catch (error) {
    // Log installation error event
    logTelemetryEventIfEnabled("tengu_ext_install_error", {});

    // Extract error message
    const errorMessage = error instanceof Error ? error.message : String(error);

    // Log the error for debugging/tracking
    reportErrorIfAllowed(error);

    // Return failure result
    return {
      installed: false,
      error: errorMessage,
      installedVersion: null
    };
  }
}

module.exports = installAndVerifyClaudeExtension;