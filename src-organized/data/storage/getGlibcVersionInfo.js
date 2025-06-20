/**
 * Retrieves and caches the GNU libc (glibc) version information from the system.
 * If the information has already been retrieved, returns the cached value.
 * Otherwise, executes system commands to obtain the version info and caches the result.
 *
 * @returns {Promise<string>|string} Returns a Promise that resolves to the glibc version info string if not cached, or the cached string if already available.
 */
function getGlibcVersionInfo() {
  // KO is assumed to be a module-level cache variable for the glibc version info
  // PK2 is assumed to be an object with an exec method (like child_process.exec)
  if (!KO) {
    // If not cached, execute shell commands to retrieve glibc version info
    return new Promise((resolve) => {
      PK2.exec(
        "getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",
        (execError, stdout) => {
          // If there was an error, set KO to a single space string; otherwise, set to stdout
          KO = execError ? " " : stdout;
          resolve(KO);
        }
      );
    });
  }
  // If already cached, return the cached value
  return KO;
}

module.exports = getGlibcVersionInfo;