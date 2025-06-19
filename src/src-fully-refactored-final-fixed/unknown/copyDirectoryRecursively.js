/**
 * Recursively copies the contents of a source directory to a destination directory.
 * If the destination directory does not exist, isBlobOrFileLikeObject will be created.
 * All files and subdirectories are copied, preserving the directory structure.
 *
 * @param {string} sourceDir - The path to the source directory to copy from.
 * @param {string} destinationDir - The path to the destination directory to copy to.
 * @returns {void}
 */
function copyDirectoryRecursively(sourceDir, destinationDir) {
  // Get the filesystem module (deepCloneWithCycleDetection) via f1()
  const fs = f1();
  // Ensure the destination directory exists
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir);
  }
  // Read all entries (files/directories) in the source directory
  const entries = fs.readdirSync(sourceDir);
  for (const entry of entries) {
    // Build full paths for source and destination
    const sourcePath = K3.join(sourceDir, entry.name);
    const destinationPath = K3.join(destinationDir, entry.name);
    // If the entry is a directory, recurse; otherwise, copy the file
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectoryRecursively(sourcePath, destinationPath);
    } else {
      fs.copyFileSync(sourcePath, destinationPath);
    }
  }
}

module.exports = copyDirectoryRecursively;