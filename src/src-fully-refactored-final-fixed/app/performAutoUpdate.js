/**
 * Attempts to perform an automatic update of the Claude Code package.
 * Handles lock contention, permission checks, environment validation, and executes the update command.
 * Reports errors and telemetry for various failure scenarios.
 *
 * @async
 * @returns {Promise<string>} Status of the update process: 'in_progress', 'install_failed', 'no_permissions', or 'success'.
 */
async function performAutoUpdate() {
  // Package metadata used for telemetry and update
  const PACKAGE_METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Attempt to acquire update lock; if unavailable, report and exit
  if (!ensureLockFile()) {
    reportErrorIfAllowed(new Error("Another process is currently installing an update"));
    logTelemetryEventIfEnabled("tengu_auto_updater_lock_contention", {
      pid: process.pid,
      currentVersion: PACKAGE_METADATA.VERSION
    });
    return "in_progress";
  }

  try {
    // Detect unsupported Windows NPM in WSL scenario
    if (!pA.isRunningWithBun() && pA.isNpmFromWindowsPath()) {
      reportErrorIfAllowed(new Error("Windows NPM detected in WSL environment"));
      logTelemetryEventIfEnabled("tengu_auto_updater_windows_npm_in_wsl", {
        currentVersion: PACKAGE_METADATA.VERSION
      });
      console.error(`
Error: Windows NPM detected in WSL

You're running Claude Code in WSL but using the Windows NPM installation from /mnt/c/.
This configuration is not supported for updates.

To fix this issue:
  1. Install Node.js within your Linux distribution: e.g. sudo apt install nodejs npm
  2. Make sure Linux NPM is in your PATH before the Windows version
  3. Try updating again with 'claude update'
`);
      return "install_failed";
    }

    // Check for global install permissions
    const { hasPermissions: hasGlobalNpmPermissions } = await getGlobalNpmInstallPermissions();
    if (!hasGlobalNpmPermissions) {
      return "no_permissions";
    }

    // Determine package manager to use (bun or npm)
    const packageManager = pA.isRunningWithBun() ? "bun" : "npm";

    // Prepare install command arguments
    const installArgs = ["install", "-g", PACKAGE_METADATA.PACKAGE_URL];

    // Execute the global install command
    const installResult = await i0(packageManager, installArgs);
    if (installResult.code !== 0) {
      reportErrorIfAllowed(new Error(`Failed to install new version of claude: ${installResult.stdout} ${installResult.stderr}`));
      return "install_failed";
    }

    return "success";
  } finally {
    // Always release the update lock
    VH5();
  }
}

module.exports = performAutoUpdate;