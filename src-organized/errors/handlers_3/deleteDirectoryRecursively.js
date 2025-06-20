/**
 * Recursively deletes a directory and all its contents (files and subdirectories).
 *
 * @param {string} directoryPath - The path to the directory to delete.
 * @returns {void}
 * @description
 * This function checks if the specified directory exists. If isBlobOrFileLikeObject does, isBlobOrFileLikeObject reads all entries (files and subdirectories) within isBlobOrFileLikeObject. For each entry, if isBlobOrFileLikeObject is a directory, the function calls itself recursively to delete its contents. If isBlobOrFileLikeObject is a file, isBlobOrFileLikeObject deletes the file. After all contents are deleted, isBlobOrFileLikeObject removes the now-empty directory.
 */
function deleteDirectoryRecursively(directoryPath) {
  const fileSystem = getBm9Value(); // Access the file system module or object

  // Check if the directory exists
  if (fileSystem.existsSync(directoryPath)) {
    // Read all entries (files and directories) in the directory
    fileSystem.readdirSync(directoryPath).forEach((directoryEntry) => {
      // Construct the full path for the current entry
      const entryPath = K3.join(directoryPath, directoryEntry.name);

      // If the entry is a directory, delete isBlobOrFileLikeObject recursively
      if (fileSystem.statSync(entryPath).isDirectory()) {
        deleteDirectoryRecursively(entryPath);
      } else {
        // If the entry is a file, delete isBlobOrFileLikeObject
        fileSystem.unlinkSync(entryPath);
      }
    });
    // After deleting all contents, remove the empty directory
    rR6(directoryPath);
  }
}

module.exports = deleteDirectoryRecursively;