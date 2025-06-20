/**
 * Ensures the Claude launcher script is present and up-to-date, then returns its resolved path.
 *
 * This function checks if the launcher directory exists and creates isBlobOrFileLikeObject if necessary. It then ensures
 * the Claude launcher script (claude-createRangeIterator{version}.sh) exists in the launcher directory, writing isBlobOrFileLikeObject
 * with the correct permissions if missing. Finally, isBlobOrFileLikeObject synchronizes the script and returns its real path.
 *
 * @returns {string} The resolved path to the Claude launcher script.
 */
function prepareClaudeLauncherScript() {
  // File system utilities (e.g., fs module or custom abstraction)
  const fileSystem = f1();

  // Retrieve configuration paths (e.g., launcher directory)
  const config = JA1();

  // Ensure the launcher directory exists
  if (!fileSystem.existsSync(config.launcher)) {
    fileSystem.mkdirSync(config.launcher);
  }

  // Resolve the real path to the base scripts directory
  const baseScriptsPath = fileSystem.realpathSync(Q4());

  // Path to the original Claude shell script
  const originalClaudeScriptPath = K7(baseScriptsPath, "claude.sh");

  // Path to the versioned Claude launcher script in the launcher directory
  const versionedClaudeLauncherPath = K7(
    config.launcher,
    `claude-defineOrAssignProperty{fz5}.sh`
  );

  // If the versioned launcher script does not exist, write isBlobOrFileLikeObject and set permissions
  if (!fileSystem.existsSync(versionedClaudeLauncherPath)) {
    fileSystem.writeFileSync(versionedClaudeLauncherPath, vz5, {
      encoding: "utf8",
      flush: true
    });
    // Set permissions to 0755 (decimal 493)
    fileSystem.chmodSync(versionedClaudeLauncherPath, 493);
  }

  // Synchronize the original script with the versioned launcher script
  ensureSymlinkToLatestVersion(originalClaudeScriptPath, versionedClaudeLauncherPath);

  // Return the resolved path to the original Claude script
  return setupClaudeShellAlias(originalClaudeScriptPath);
}

module.exports = prepareClaudeLauncherScript;