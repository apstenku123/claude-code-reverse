/**
 * Attempts to uninstall the global @anthropic-ai/claude-code npm package using npm CLI.
 * Reports any errors encountered during the process.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if uninstallation succeeds, false otherwise.
 */
async function uninstallGlobalClaudeCodePackage() {
  try {
    // Define the uninstall command arguments for npm
    const uninstallArgs = [
      "uninstall",
      "-g",
      "--force",
      // The package name is extracted from the metadata object below
      {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
        VERSION: "1.0.19"
      }.PACKAGE_URL
    ];

    // Execute the npm uninstall command using the provided i0 function
    const uninstallResult = await i0("npm", uninstallArgs);

    // If the uninstall command failed, report the error and return false
    if (uninstallResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to uninstall global version: ${uninstallResult.stderr}`));
      return false;
    }

    // Uninstallation succeeded
    return true;
  } catch (error) {
    // Catch any unexpected errors, report them, and return false
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = uninstallGlobalClaudeCodePackage;