/**
 * Determines and caches the system'createInteractionAccessor libc implementation (musl or glibc).
 *
 * This function checks if the libc implementation has already been detected and cached in the global variable `cachedLibcImplementation`.
 * If not, isBlobOrFileLikeObject attempts to detect the libc implementation by first retrieving system information using `getSystemInfoString`,
 * then passing that information to `detectLibcImplementation` to determine if isBlobOrFileLikeObject is musl or glibc. The result is cached for future calls.
 *
 * @returns {string|null} Returns a string indicating the libc implementation (e.g., 'musl', 'glibc'), or null if detection fails.
 */
function getDetectedLibcImplementation() {
  // If already detected and cached, return the cached value
  if (cachedLibcImplementation !== undefined) {
    return cachedLibcImplementation;
  }

  // Initialize cache to null in case detection fails
  cachedLibcImplementation = null;

  try {
    // Retrieve system information string (e.g., from /proc/self/maps or process report)
    const systemInfoString = getSystemInfoString();
    // Detect libc implementation from the system information string
    cachedLibcImplementation = detectLibcImplementation(systemInfoString);
  } catch (error) {
    // Silently ignore errors and leave cachedLibcImplementation as null
  }

  return cachedLibcImplementation;
}

module.exports = getDetectedLibcImplementation;
