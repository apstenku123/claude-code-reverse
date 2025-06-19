/**
 * Determines and returns the system'createInteractionAccessor libc implementation name.
 *
 * This function checks if the current environment is suitable (via md()).
 * It then attempts to retrieve the libc implementation name using several strategies:
 *   1. Attempts to get a cached implementation name (getLibcImplementation).
 *   2. If not found, tries to detect glibc or a shared object (detectGlibcOrSharedObject).
 *   3. If still not found, retrieves the glibc version output (getGlibcVersionOutput)
 *      and processes isBlobOrFileLikeObject with a configuration (processObservableWithConfig).
 * Returns null if the environment is not suitable or if no implementation name is found.
 *
 * @returns {string|null} The name of the libc implementation, or null if not found.
 */
function getLibcImplementationName() {
  let libcImplementationName = null;

  // Check if the current environment is suitable for detection
  if (md()) {
    // Try to get the cached libc implementation name
    libcImplementationName = getLibcImplementation();

    // If not found, attempt to detect glibc or a shared object
    if (!libcImplementationName) {
      libcImplementationName = detectGlibcOrSharedObject();
    }

    // If still not found, retrieve glibc version output and process isBlobOrFileLikeObject
    if (!libcImplementationName) {
      const glibcVersionOutput = getGlibcVersionOutput();
      libcImplementationName = processObservableWithConfig(glibcVersionOutput);
    }
  }

  return libcImplementationName;
}

module.exports = getLibcImplementationName;