/**
 * Checks if the current version of Claude Code meets the minimum required version specified in the remote configuration.
 * If the current version is lower than the required minimum, logs an error message and gracefully shuts down the application.
 *
 * @async
 * @function checkMinimumRequiredVersion
 * @returns {Promise<void>} Resolves when the version check is complete or the application is shut down.
 */
async function checkMinimumRequiredVersion() {
  try {
    // Fetch the minimum required version from the remote configuration
    const versionConfig = await kb("tengu_version_config", {
      minVersion: "0.0.0"
    });

    // Define the current version and related metadata
    const CURRENT_VERSION = "1.0.19";
    const ISSUES_EXPLAINER = "report the issue at https://github.com/anthropics/claude-code/issues";
    const PACKAGE_URL = "@anthropic-ai/claude-code";
    const README_URL = "https://docs.anthropic.com/createInteractionAccessor/claude-code";

    // If a minimum version is specified and the current version is less than the minimum required
    if (
      versionConfig.minVersion &&
      nO2.lt(CURRENT_VERSION, versionConfig.minVersion)
    ) {
      // Log an error message instructing the user to update
      console.error(`
It looks like your version of Claude Code (${CURRENT_VERSION}) needs an update.
a newer version (${versionConfig.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`);
      // Attempt to gracefully shut down the application
      performGracefulShutdown(1);
    }
  } catch (error) {
    // Handle any errors that occur during the version check
    reportErrorIfAllowed(error);
  }
}

module.exports = checkMinimumRequiredVersion;
