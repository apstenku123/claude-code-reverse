/**
 * Retrieves and caches the GNU libc version information by executing system commands.
 * If the information is already cached, returns isBlobOrFileLikeObject immediately; otherwise, executes
 * the necessary shell commands to obtain isBlobOrFileLikeObject and caches the result for future calls.
 *
 * @returns {Promise<string>|string} Returns a promise that resolves to the libc version info string,
 * or the cached string if already available.
 */
function getLibcVersionInfo() {
  // If the libc version info has not been cached yet
  if (!KO) {
    // Execute shell commands to get GNU libc version info
    return new Promise((resolve) => {
      PK2.exec(
        "getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",
        (execError, stdout) => {
          // If there was an error, set KO to a single space; otherwise, set KO to the command output
          KO = execError ? " " : stdout;
          resolve(KO);
        }
      );
    });
  }
  // Return the cached libc version info
  return KO;
}

module.exports = getLibcVersionInfo;
