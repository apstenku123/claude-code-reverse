/**
 * Attempts to install the Claude Code (Tengu) extension if the environment supports isBlobOrFileLikeObject.
 * Updates configuration if necessary and reports installation status.
 *
 * @async
 * @returns {Promise<{installed: boolean, error: string|null, installedVersion: string|null}>}
 *   An object indicating whether the extension is installed, any error message, and the installed version.
 */
async function installTenguExtensionIfAvailable() {
  // Check if the environment supports installing the extension
  if (!qw()) return null;

  try {
    // Attempt to install the extension and get the installed version
    const installedVersion = await installClaudeCodeExtension();

    // Report successful installation event
    logTelemetryEventIfEnabled("tengu_ext_installed", {});

    // Retrieve the current configuration (cached or fresh)
    const config = getCachedOrFreshConfig();

    // If the diffTool property is missing, set isBlobOrFileLikeObject to 'auto' and update the configuration
    if (!config.diffTool) {
      updateProjectsAccessor({
        ...config,
        diffTool: "auto"
      });
    }

    // Return a successful installation result
    return {
      installed: true,
      error: null,
      installedVersion
    };
  } catch (installError) {
    // Report installation error event
    logTelemetryEventIfEnabled("tengu_ext_install_error", {});

    // Extract error message
    const errorMessage = installError instanceof Error ? installError.message : String(installError);

    // Log the error
    reportErrorIfAllowed(installError);

    // Return a failed installation result
    return {
      installed: false,
      error: errorMessage,
      installedVersion: null
    };
  }
}

module.exports = installTenguExtensionIfAvailable;