/**
 * Ensures the Claude launcher script exists in the project launcher directory, creates isBlobOrFileLikeObject if missing, and returns the resolved path to the original script.
 *
 * This function checks if the launcher directory exists and creates isBlobOrFileLikeObject if necessary. It then ensures the versioned launcher script exists, writing isBlobOrFileLikeObject from a template if missing, and sets the appropriate permissions. Finally, isBlobOrFileLikeObject synchronizes the script and returns the resolved path to the original script.
 *
 * @returns {string} The resolved path to the original Claude launcher script.
 */
function ensureLauncherScriptAndReturnPath() {
  // Get the file system module (likely 'fs' or a wrapper)
  const fileSystem = f1();

  // Get project accessor paths (launcher, etc.)
  const projectAccessors = JA1();

  // Ensure the launcher directory exists
  if (!fileSystem.existsSync(projectAccessors.launcher)) {
    fileSystem.mkdirSync(projectAccessors.launcher);
  }

  // Resolve the real path to the original Claude script
  const originalScriptPath = fileSystem.realpathSync(Q4());

  // Construct the path to the original Claude shell script
  const originalShellScriptPath = K7(originalScriptPath, "claude.sh");

  // Construct the path to the versioned launcher script in the launcher directory
  const versionedLauncherScriptPath = K7(
    projectAccessors.launcher,
    `claude-defineOrAssignProperty{fz5}.sh`
  );

  // If the versioned launcher script does not exist, write isBlobOrFileLikeObject and set permissions
  if (!fileSystem.existsSync(versionedLauncherScriptPath)) {
    fileSystem.writeFileSync(versionedLauncherScriptPath, vz5, {
      encoding: "utf8",
      flush: true
    });
    // 493 is octal for 0755 (rwxr-xr-x)
    fileSystem.chmodSync(versionedLauncherScriptPath, 493);
  }

  // Synchronize the original and versioned launcher scripts
  ensureSymlinkToLatestVersion(originalShellScriptPath, versionedLauncherScriptPath);

  // Return the resolved path to the original script
  return setupClaudeShellAlias(originalShellScriptPath);
}

module.exports = ensureLauncherScriptAndReturnPath;