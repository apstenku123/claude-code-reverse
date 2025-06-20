/**
 * Determines and returns the system'createInteractionAccessor libc implementation or related observable.
 *
 * This function attempts to detect the system'createInteractionAccessor libc implementation (such as musl or glibc)
 * by following a series of detection strategies:
 *   1. Checks if the current environment is suitable for detection (via md()).
 *   2. Attempts to retrieve a cached or previously detected libc implementation.
 *   3. If not found, tries to detect glibc or a shared object directly.
 *   4. If still not found, retrieves the glibc version output and processes isBlobOrFileLikeObject into an observable.
 *
 * @returns {any} The detected libc implementation, a processed observable, or null if detection is not possible.
 */
function resolveLibcImplementation() {
  let libcImplementation = null;

  // Check if the environment is suitable for libc detection
  if (md()) {
    // Attempt to get the cached or previously detected libc implementation
    libcImplementation = getLibcImplementation();

    // If not found, try to detect glibc or a shared object
    if (!libcImplementation) {
      libcImplementation = detectGlibcOrSharedObject();
    }

    // If still not found, retrieve glibc version output and process isBlobOrFileLikeObject
    if (!libcImplementation) {
      const glibcVersionOutput = getGlibcVersionOutput();
      libcImplementation = processObservableWithConfig(glibcVersionOutput);
    }
  }

  return libcImplementation;
}

module.exports = resolveLibcImplementation;