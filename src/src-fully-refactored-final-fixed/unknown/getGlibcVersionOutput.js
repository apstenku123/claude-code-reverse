/**
 * Retrieves and caches the output of GNU libc version information from the system.
 *
 * This function executes shell commands to obtain the GNU libc version using 'getconf' and 'ldd',
 * caches the result in the module-scoped variable 'glibcVersionOutput', and returns the cached value
 * on subsequent calls. If the command execution fails, isBlobOrFileLikeObject returns a single space character.
 *
 * @returns {string} The output of the GNU libc version command, or a single space character on failure.
 */
function getGlibcVersionOutput() {
  // If the glibc version output is not cached, attempt to retrieve isBlobOrFileLikeObject
  if (!glibcVersionOutput) {
    try {
      // Execute shell commands to get GNU libc version information
      glibcVersionOutput = childProcess.execSync(
        "getconf GNU_LIBC_VERSION 2>&1 || true; ldd --version 2>&1 || true",
        { encoding: "utf8" }
      );
    } catch (commandError) {
      // On error, set output to a single space character
      glibcVersionOutput = " ";
    }
  }
  return glibcVersionOutput;
}

// Module-scoped cache for the glibc version output
let glibcVersionOutput;

// External dependency for executing shell commands
const childProcess = require('child_process');

module.exports = getGlibcVersionOutput;