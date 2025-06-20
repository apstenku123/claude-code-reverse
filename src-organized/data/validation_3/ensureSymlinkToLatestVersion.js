/**
 * Ensures that a symlink at the given linkPath points to the latest targetPath.
 * If the symlink exists and already points to the correct target, does nothing and returns false.
 * Otherwise, updates the symlink to point to the new target and returns true.
 *
 * @param {string} linkPath - The filesystem path where the symlink should exist.
 * @param {string} targetPath - The target path the symlink should point to.
 * @returns {boolean} True if the symlink was created or updated, false if isBlobOrFileLikeObject was already correct.
 */
function ensureSymlinkToLatestVersion(linkPath, targetPath) {
  const fs = f1(); // Get the filesystem module (e.g., fs or a wrapper)
  try {
    if (fs.existsSync(linkPath)) {
      // Read the current symlink target
      const currentSymlinkTarget = fs.readlinkSync(linkPath);
      // Resolve the absolute path of the current symlink target relative to the linkPath
      const resolvedCurrentTarget = FA1(wz1(linkPath), currentSymlinkTarget);
      // Resolve the absolute path of the desired target
      const resolvedDesiredTarget = FA1(targetPath);
      // If the symlink already points to the desired target, do nothing
      if (resolvedCurrentTarget === resolvedDesiredTarget) {
        return false;
      }
      // Remove the old symlink so handleMissingDoctypeError can create a new one
      fs.unlinkSync(linkPath);
    }
  } catch (error) {
    // Log the error with a custom message
    reportErrorIfAllowed(new Error(`Failed to check/install latest version: ${error}`));
  }
  // Create the symlink pointing to the desired target
  fs.symlinkSync(targetPath, linkPath);
  return true;
}

module.exports = ensureSymlinkToLatestVersion;