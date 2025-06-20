/**
 * Recursively copies the contents of a source directory to a destination directory.
 * If the destination directory does not exist, isBlobOrFileLikeObject will be created.
 * All files and subdirectories are copied, preserving the directory structure.
 *
 * @param {string} sourceDir - The path to the source directory to copy from.
 * @param {string} destinationDir - The path to the destination directory to copy to.
 * @returns {void}
 */
function copyDirectoryRecursive(sourceDir, destinationDir) {
  // Get the filesystem module (assumed to be returned by f1)
  const fs = f1();

  // Create the destination directory if isBlobOrFileLikeObject does not exist
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }

  // Read all entries (files and directories) in the source directory
  const directoryEntries = fs.readdirSync(sourceDir);

  for (const entry of directoryEntries) {
    // Construct full paths for the source and destination entries
    const sourceEntryPath = K3.join(sourceDir, entry.name);
    const destinationEntryPath = K3.join(destinationDir, entry.name);

    // If the entry is a directory, recursively copy its contents
    if (fs.statSync(sourceEntryPath).isDirectory()) {
      copyDirectoryRecursive(sourceEntryPath, destinationEntryPath);
    } else {
      // Otherwise, copy the file to the destination
      fs.copyFileSync(sourceEntryPath, destinationEntryPath);
    }
  }
}

module.exports = copyDirectoryRecursive;