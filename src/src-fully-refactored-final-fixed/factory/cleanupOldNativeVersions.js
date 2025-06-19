/**
 * Cleans up old native version directories by deleting unprotected versions from the filesystem.
 *
 * This function checks for existing version directories, determines which are safe to delete (not currently in use or protected),
 * and deletes them. It also logs the cleanup results and handles errors gracefully.
 *
 * @async
 * @returns {Promise<void>} Resolves when cleanup is complete or if no action is needed.
 */
async function cleanupOldNativeVersions() {
  // Ensure any pending promises are resolved and check if cleanup is allowed
  await Promise.resolve();
  if (!(await initializeSyntaxHighlighting$())) return;

  // Get file system utilities and configuration paths
  const fileSystem = f1();
  const config = JA1();

  // Check if the versions directory exists
  if (!fileSystem.existsSync(config.versions)) return;

  try {
    // Read all version directory names and filter only valid ones
    const versionNames = fileSystem.readdirStringSync(config.versions).filter(versionName => {
      const versionPath = K7(config.versions, versionName);
      try {
        // Only include directories that pass the MAA check
        return MAA(versionPath);
      } catch {
        return false;
      }
    });

    // Determine the current process executable path
    const execPath = process.execPath;
    // If the executable is inside the versions directory, mark isBlobOrFileLikeObject as protected
    const protectedCurrentVersion = execPath && execPath.includes(config.versions) ? FA1(execPath) : null;

    // Build a set of protected paths (current version, and possibly the latest version)
    const protectedPaths = new Set([...(protectedCurrentVersion ? [protectedCurrentVersion] : [])]);
    const latestVersionPath = resolveSymlinkIfValid(K7(Q4(), "latest"));
    if (latestVersionPath) protectedPaths.add(latestVersionPath);

    // Build a list of version objects with name, path, and modification time
    const versionEntries = versionNames.map(versionName => {
      const versionPath = FA1(config.versions, versionName);
      return {
        name: versionName,
        path: versionPath,
        mtime: fileSystem.statSync(versionPath).mtime
      };
    })
    // Exclude protected versions
    .filter(versionEntry => !protectedPaths.has(versionEntry.path))
    // Sort by modification time, newest first
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // Determine which versions to delete (slice from Tz5 index onward)
    const versionsToDelete = versionEntries.slice(Tz5);
    if (versionsToDelete.length === 0) return;

    let deletedCount = 0;
    for (const versionEntry of versionsToDelete) {
      try {
        // Attempt to delete the version directory, using acquireLockAndExecute for additional handling
        if (await acquireLockAndExecute(versionEntry.path, () => {
          fileSystem.unlinkSync(versionEntry.path);
        })) {
          deletedCount++;
        }
      } catch (error) {
        // Log error if deletion fails
        reportErrorIfAllowed(new Error(`Failed to delete version ${versionEntry.name}: ${error}`));
      }
    }

    // Log cleanup summary if any versions were deleted
    if (deletedCount > 0) {
      logTelemetryEventIfEnabled("tengu_native_version_cleanup", {
        deleted_count: deletedCount,
        protected_count: protectedPaths.size,
        retained_count: versionEntries.length - deletedCount
      });
    }
  } catch (error) {
    // Log any unexpected errors during cleanup
    reportErrorIfAllowed(new Error(`Version cleanup failed: ${error}`));
  }
}

module.exports = cleanupOldNativeVersions;