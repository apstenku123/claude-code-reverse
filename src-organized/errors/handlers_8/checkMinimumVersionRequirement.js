/**
 * Checks if the current version of Claude Code meets the minimum required version.
 * If the current version is lower than the required minimum, logs an error message and exits the process.
 *
 * @async
 * @returns {Promise<void>} Resolves if the version requirement is met; otherwise, logs an error and exits.
 */
async function checkMinimumVersionRequirement() {
  try {
    // Fetch the minimum required version configuration
    const versionConfig = await kb("tengu_version_config", {
      minVersion: "0.0.0"
    });

    // Define the current package metadata
    const packageMetadata = {
      ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
      PACKAGE_URL: "@anthropic-ai/claude-code",
      README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
      VERSION: "1.0.19"
    };

    // Check if the fetched config specifies a minimum version and if the current version is less than required
    if (
      versionConfig.minVersion &&
      nO2.lt(packageMetadata.VERSION, versionConfig.minVersion)
    ) {
      // Log an error message with update instructions
      console.error(`
It looks like your version of Claude Code (${packageMetadata.VERSION}) needs an update.
a newer version (${versionConfig.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`);
      // Exit the process with code 1
      Q7(1);
    }
  } catch (error) {
    // Handle any errors that occur during the version check
    reportErrorIfAllowed(error);
  }
}

module.exports = checkMinimumVersionRequirement;
