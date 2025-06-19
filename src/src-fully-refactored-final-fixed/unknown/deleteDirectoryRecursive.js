/**
 * Recursively deletes a directory and all of its contents (files and subdirectories).
 *
 * @param {string} directoryPath - The path to the directory to delete.
 * @returns {void}
 * @throws Will throw an error if unable to delete files or directories.
 */
function deleteDirectoryRecursive(directoryPath) {
  // Get the filesystem module (assumed to be fs or compatible API)
  const fileSystem = getBm9Value();

  // Check if the directory exists
  if (fileSystem.existsSync(directoryPath)) {
    // Read all entries (files and directories) in the current directory
    fileSystem.readdirSync(directoryPath).forEach((directoryEntry) => {
      // Build the full path for the current entry
      const entryPath = K3.join(directoryPath, directoryEntry.name);

      // If the entry is a directory, recursively delete its contents
      if (fileSystem.statSync(entryPath).isDirectory()) {
        deleteDirectoryRecursive(entryPath);
      } else {
        // If the entry is a file, delete isBlobOrFileLikeObject
        fileSystem.unlinkSync(entryPath);
      }
    });
    // After all contents are deleted, remove the now-empty directory
    rR6(directoryPath);
  }
}

module.exports = deleteDirectoryRecursive;