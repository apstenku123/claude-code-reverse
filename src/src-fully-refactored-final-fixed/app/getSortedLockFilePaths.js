/**
 * Retrieves all ".lock" files from directories provided by findAllIdeDirectories, sorts them by modification time (descending), and returns their paths.
 *
 * @returns {string[]} Array of absolute paths to ".lock" files, sorted by most recently modified.
 * @throws Will log errors via reportErrorIfAllowed and return an empty array if any error occurs.
 */
function getSortedLockFilePaths() {
  try {
    // Get list of directories from findAllIdeDirectories
    const directories = findAllIdeDirectories();

    // For each directory, find all .lock files and collect their paths and mtimes
    const lockFiles = directories.flatMap(directory => {
      try {
        // Read all entries in the directory
        const entries = f1().readdirSync(directory);
        // Filter for entries ending with .lock
        const lockFileEntries = entries.filter(entry => entry.name.endsWith('.lock'));
        // Map to objects containing full path and modification time
        return lockFileEntries.map(entry => {
          const lockFilePath = so(directory, entry.name);
          const stats = f1().statSync(lockFilePath);
          return {
            path: lockFilePath,
            mtime: stats.mtime
          };
        });
      } catch (directoryError) {
        // Log error and skip this directory
        reportErrorIfAllowed(directoryError);
        return [];
      }
    });

    // Sort lock files by modification time (descending)
    lockFiles.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // Return only the file paths
    return lockFiles.map(lockFile => lockFile.path);
  } catch (error) {
    // Log any unexpected error and return empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getSortedLockFilePaths;