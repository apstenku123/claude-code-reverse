/**
 * Installs the Claude CLI npm package at the specified version, updates configuration, and handles errors.
 *
 * @async
 * @function installClaudeCliPackage
 * @param {string} [version="latest"] - The version of the Claude CLI package to install (defaults to "latest").
 * @returns {Promise<string>} Returns "success" if installation and migration succeed, "in_progress" if installation is already in progress, or "install_failed" if installation fails.
 */
async function installClaudeCliPackage(version = "latest") {
  try {
    // Check if prerequisites for installation are met
    const prerequisitesMet = await i1A();
    if (!prerequisitesMet) {
      return "install_failed";
    }

    // Construct the full npm package name with version
    const CLAUDE_CLI_PACKAGE = "@anthropic-ai/claude-code";
    const packageToInstall = `${CLAUDE_CLI_PACKAGE}@${version}`;

    // Install the package using npm
    const installResult = await new Promise((resolve) => {
      HH5(
        "npm",
        [
          "install",
          packageToInstall
        ],
        {
          cwd: mO, // Working directory for npm install
          maxBuffer: 1e6 // Maximum buffer size for stdout/stderr
        },
        (error, stdout, stderr) => {
          if (error) {
            resolve({
              stdout: stdout || "",
              stderr: stderr || "",
              code: typeof error.code === "number" ? error.code : 1
            });
          } else {
            resolve({
              stdout,
              stderr,
              code: 0
            });
          }
        }
      );
    });

    // Handle installation errors
    if (installResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to install Claude CLI package: ${installResult.stderr}`));
      // If code 190, installation is already in progress
      return installResult.code === 190 ? "in_progress" : "install_failed";
    }

    // Retrieve current configuration
    const currentConfig = getCachedOrFreshConfig();

    // Update configuration to reflect migration
    updateProjectsAccessor({
      ...currentConfig,
      autoUpdaterStatus: "migrated"
    });

    return "success";
  } catch (error) {
    // Log error and return failure status
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return "install_failed";
  }
}

module.exports = installClaudeCliPackage;