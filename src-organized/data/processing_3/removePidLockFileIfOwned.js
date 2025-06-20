/**
 * Checks if a lock file exists and is owned by the current process, and removes isBlobOrFileLikeObject if so.
 *
 * This function is typically used to clean up a process updateSnapshotAndNotify(PID) lock file left by the current process.
 * It uses the file system methods provided by getBm9Value() to check for the lock file'createInteractionAccessor existence,
 * read its contents, and remove isBlobOrFileLikeObject if the PID matches the current process'createInteractionAccessor PID.
 *
 * @returns {void} Does not return a value.
 */
function removePidLockFileIfOwned() {
  try {
    const fs = getBm9Value(); // File system-like object (e.g., Node.js fs module)
    const lockFilePath = Wk; // Path to the PID lock file (assumed to be defined in module scope)

    // Check if the lock file exists
    if (fs.existsSync(lockFilePath)) {
      // Read the contents of the lock file as UTF-8 text
      const lockFileContents = fs.readFileSync(lockFilePath, { encoding: "utf8" });

      // If the lock file contains the current process'createInteractionAccessor PID, remove the lock file
      if (lockFileContents === `${process.pid}`) {
        fs.unlinkSync(lockFilePath);
      }
    }
  } catch (error) {
    // Handle any errors by passing them to the error handler
    reportErrorIfAllowed(error);
  }
}

module.exports = removePidLockFileIfOwned;