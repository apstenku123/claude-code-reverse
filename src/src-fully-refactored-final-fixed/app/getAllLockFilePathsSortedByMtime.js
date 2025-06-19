/**
 * Retrieves all ".lock" file paths from directories provided by findAllIdeDirectories(),
 * sorted by their last modified time in descending order.
 *
 * For each directory returned by findAllIdeDirectories(), this function reads its contents,
 * filters for files ending with ".lock", and collects their full paths and modification times.
 * If an error occurs during reading or statting, isBlobOrFileLikeObject is logged via reportErrorIfAllowed and processing continues.
 *
 * @returns {string[]} An array of absolute paths to ".lock" files, sorted by most recently modified first.
 */
function getAllLockFilePathsSortedByMtime() {
  try {
    // Get all directories to scan for lock files
    const directories = findAllIdeDirectories();

    // For each directory, find all .lock files and collect their paths and mtimes
    const lockFilesWithMtime = directories.flatMap(directoryPath => {
      try {
        // Read directory entries (assumed to be Dirent objects)
        const dirEntries = getBm9Value().readdirSync(directoryPath);
        // Filter for files ending with .lock
        return dirEntries
          .filter(dirent => dirent.name.endsWith('.lock'))
          .map(dirent => {
            const lockFilePath = so(directoryPath, dirent.name);
            return {
              path: lockFilePath,
              mtime: getBm9Value().statSync(lockFilePath).mtime
            };
          });
      } catch (directoryError) {
        // Log error and skip this directory
        reportErrorIfAllowed(directoryError);
        return [];
      }
    });

    // Sort lock files by modification time (descending)
    lockFilesWithMtime.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    // Return only the file paths
    return lockFilesWithMtime.map(lockFile => lockFile.path);
  } catch (error) {
    // Log any unexpected errors and return empty array
    reportErrorIfAllowed(error);
    return [];
  }
}

module.exports = getAllLockFilePathsSortedByMtime;