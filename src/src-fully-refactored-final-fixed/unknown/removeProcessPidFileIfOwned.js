/**
 * Checks if a lock file exists and if isBlobOrFileLikeObject contains the current process PID. If so, deletes the lock file.
 * Any errors encountered during the process are handled by the provided error handler.
 *
 * @returns {void}
 */
function removeProcessPidFileIfOwned() {
  try {
    // Get the file system module from the current bm9 value accessor
    const fileSystem = getBm9Value();
    // The lock file path (Wk) is assumed to be defined in the outer scope
    if (fileSystem.existsSync(lockFilePath)) {
      // Read the contents of the lock file as UTF-8 text
      const fileContents = fileSystem.readFileSync(lockFilePath, { encoding: "utf8" });
      // If the file contains the current process PID, remove the lock file
      if (fileContents === `${process.pid}`) {
        fileSystem.unlinkSync(lockFilePath);
      }
    }
  } catch (error) {
    // Handle any errors using the provided error handler
    handleError(error);
  }
}

module.exports = removeProcessPidFileIfOwned;