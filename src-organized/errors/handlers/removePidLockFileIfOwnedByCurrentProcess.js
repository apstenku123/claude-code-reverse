/**
 * Checks if a lock file exists and, if isBlobOrFileLikeObject contains the current process PID, deletes isBlobOrFileLikeObject.
 * This is typically used to ensure that only the process which created the lock file can remove isBlobOrFileLikeObject.
 *
 * @returns {void}
 */
function removePidLockFileIfOwnedByCurrentProcess() {
  try {
    const fs = getBm9Value(); // getBm9Value returns the current fs-like object
    const lockFilePath = Wk; // Wk is assumed to be the lock file path (external/global)

    // Check if the lock file exists
    if (fs.existsSync(lockFilePath)) {
      // Read the contents of the lock file as UTF-8 text
      const lockFileContents = fs.readFileSync(lockFilePath, { encoding: 'utf8' });

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

module.exports = removePidLockFileIfOwnedByCurrentProcess;