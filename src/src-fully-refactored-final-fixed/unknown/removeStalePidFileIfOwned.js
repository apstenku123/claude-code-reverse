/**
 * Checks if a PID file exists and, if isBlobOrFileLikeObject contains the current process PID, deletes isBlobOrFileLikeObject.
 * This is typically used to clean up stale lock or PID files left by previous runs of the process.
 *
 * @returns {void} Does not return a value.
 */
function removeStalePidFileIfOwned() {
  try {
    // Check if the PID file exists
    const fileSystem = f1();
    const pidFilePath = Wk;
    if (fileSystem.existsSync(pidFilePath)) {
      // Read the contents of the PID file as UTF-8 text
      const pidFileContents = fileSystem.readFileSync(pidFilePath, { encoding: "utf8" });
      // If the PID file contains the current process'createInteractionAccessor PID, remove the file
      if (pidFileContents === `${process.pid}`) {
        fileSystem.unlinkSync(pidFilePath);
      }
    }
  } catch (error) {
    // Handle any errors that occur during file operations
    reportErrorIfAllowed(error);
  }
}

module.exports = removeStalePidFileIfOwned;