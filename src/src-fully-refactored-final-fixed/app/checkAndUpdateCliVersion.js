/**
 * Checks the current CLI version, compares isBlobOrFileLikeObject to the latest available version,
 * and performs an update if necessary. Handles both local and global installations,
 * provides user feedback, and manages error conditions.
 *
 * @async
 * @returns {void}
 */
async function checkAndUpdateCliVersion() {
  // Constants for current package metadata
  const PACKAGE_METADATA = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Send update check event (possibly for analytics or logging)
  logTelemetryEventIfEnabled("tengu_update_check", {});

  // Log current version
  console.log(`Current version: ${PACKAGE_METADATA.VERSION}`);
  console.log("Checking for updates...");

  // Attempt native update check and install if supported
  if (await initializeSyntaxHighlighting$()) {
    try {
      const nativeUpdateResult = await checkAndUpdateToLatestVersion();
      if (!nativeUpdateResult.latestVersion) {
        console.error("Failed to check for updates");
        process.exit(1);
      }

      if (nativeUpdateResult.latestVersion === PACKAGE_METADATA.VERSION) {
        // Already up to date
        console.log(`${m0} is up to date (${PACKAGE_METADATA.VERSION})`);
      } else if (nativeUpdateResult.wasUpdated) {
        // Successfully updated
        console.log(`Successfully updated from ${PACKAGE_METADATA.VERSION} to version ${nativeUpdateResult.latestVersion}`);
      } else {
        // No update performed but version is latest
        console.log(`${m0} is up to date (${PACKAGE_METADATA.VERSION})`);
      }
      process.exit(0);
    } catch (error) {
      console.error("Error: Failed to install native update");
      console.error(String(error));
      console.error('Try running "claude doctor" for diagnostics');
      process.exit(1);
    }
  }

  // Fallback: Check for updates via alternate method
  const latestVersion = await Qz1();
  if (!latestVersion) {
    console.error("Failed to check for updates");
    process.exit(1);
  }

  if (latestVersion === PACKAGE_METADATA.VERSION) {
    // Already up to date
    console.log(`${m0} is up to date (${PACKAGE_METADATA.VERSION})`);
    process.exit(0);
  }

  // New version available
  console.log(`New version available: ${latestVersion} (current: ${PACKAGE_METADATA.VERSION})`);
  console.log("Installing update...");

  // Determine update method: local or global
  const isLocalInstall = getCachedOrFreshConfig().autoUpdaterStatus === "migrated";
  const isNpmLocalInstall = Fk();
  let updateResult;

  if (isLocalInstall || isNpmLocalInstall) {
    // Use local installation update method
    console.log("Using local installation update method...");
    updateResult = await installClaudeCliPackage();
  } else {
    // Use global installation update method
    console.log("Using global installation update method...");
    updateResult = await performAutoUpdate();
  }

  // Handle update result
  switch (updateResult) {
    case "success":
      console.log(`Successfully updated from ${PACKAGE_METADATA.VERSION} to version ${latestVersion}`);
      break;
    case "no_permissions":
      console.error("Error: Insufficient permissions to install update");
      if (isLocalInstall) {
        console.error("Try manually updating with:");
        console.error(`  cd ~/.claude/local && npm update ${PACKAGE_METADATA.PACKAGE_URL}`);
      } else {
        console.error("Try running with sudo or fix npm permissions");
        console.error("Or consider migrating to a local installation with:");
        console.error("  /migrate-installer");
      }
      process.exit(1);
      break;
    case "install_failed":
      console.error("Error: Failed to install update");
      if (isLocalInstall) {
        console.error("Try manually updating with:");
        console.error(`  cd ~/.claude/local && npm update ${PACKAGE_METADATA.PACKAGE_URL}`);
      } else {
        console.error("Or consider migrating to a local installation with:");
        console.error("  /migrate-installer");
      }
      process.exit(1);
      break;
    case "in_progress":
      console.error("Error: Another instance is currently performing an update");
      console.error("Please wait and try again later");
      process.exit(1);
      break;
  }
  process.exit(0);
}

module.exports = checkAndUpdateCliVersion;