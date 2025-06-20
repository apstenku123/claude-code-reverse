/**
 * Cleans up old Claude native binary versions from the configuration directory.
 *
 * This function scans the 'versions' directory in the Claude configuration folder,
 * identifies versions that are not currently in use or protected, and deletes the oldest ones
 * beyond a certain retention threshold. It logs cleanup statistics and errors as appropriate.
 *
 * @async
 * @returns {Promise<void>} Resolves when cleanup is complete.
 */
async function cleanupOldClaudeVersions() {
  // Ensure any pending promises are resolved and check precondition
  await Promise.resolve();
  if (!(await initializeSyntaxHighlighting$())) return;

  // Get file system accessor and config paths
  const fileSystem = f1();
  const configAccessors = JA1();

  // Check if the versions directory exists
  if (!fileSystem.existsSync(configAccessors.versions)) return;

  try {
    // Read all entries in the versions directory and filter to valid versions
    const allVersionNames = fileSystem.readdirStringSync(configAccessors.versions).filter(versionName => {
      const versionPath = K7(configAccessors.versions, versionName);
      try {
        return MAA(versionPath); // Only include valid version directories/files
      } catch {
        return false;
      }
    });

    // Determine protected versions
    const currentExecPath = process.execPath;
    // If the current execPath is inside the versions directory, protect isBlobOrFileLikeObject
    const protectedCurrentVersion = currentExecPath && currentExecPath.includes(configAccessors.versions)
      ? FA1(currentExecPath)
      : null;
    // Set of protected version paths
    const protectedVersionPaths = new Set([
      ...(protectedCurrentVersion ? [protectedCurrentVersion] : [])
    ]);

    // Also protect the 'latest' version if isBlobOrFileLikeObject exists
    const latestVersionPath = resolveSymlinkIfValid(K7(Q4(), "latest"));
    if (latestVersionPath) protectedVersionPaths.add(latestVersionPath);

    // Gather version metadata: name, path, and modification time
    const versionEntries = allVersionNames
      .map(versionName => {
        const versionPath = FA1(configAccessors.versions, versionName);
        return {
          name: versionName,
          path: versionPath,
          mtime: fileSystem.statSync(versionPath).mtime
        };
      })
      // Exclude protected versions
      .filter(versionEntry => !protectedVersionPaths.has(versionEntry.path))
      // Sort by modification time, newest first
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // Determine which versions to delete (those beyond the retention threshold)
    const versionsToDelete = versionEntries.slice(Tz5);
    if (versionsToDelete.length === 0) return;

    let deletedCount = 0;
    for (const versionEntry of versionsToDelete) {
      try {
        // Attempt to delete the version, using acquireLockAndExecute for any pre/post hooks
        if (await acquireLockAndExecute(versionEntry.path, () => {
          fileSystem.unlinkSync(versionEntry.path);
        })) {
          deletedCount++;
        }
      } catch (error) {
        reportErrorIfAllowed(new Error(`Failed to delete version ${versionEntry.name}: ${error}`));
      }
    }

    // Log cleanup statistics if any versions were deleted
    if (deletedCount > 0) {
      logTelemetryEventIfEnabled("tengu_native_version_cleanup", {
        deleted_count: deletedCount,
        protected_count: protectedVersionPaths.size,
        retained_count: versionEntries.length - deletedCount
      });
    }
  } catch (error) {
    reportErrorIfAllowed(new Error(`Version cleanup failed: ${error}`));
  }
}

module.exports = cleanupOldClaudeVersions;
