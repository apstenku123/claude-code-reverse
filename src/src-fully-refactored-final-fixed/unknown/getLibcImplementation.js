/**
 * Determines the system'createInteractionAccessor libc implementation (musl or glibc) by inspecting system information.
 * Utilizes a cached value to avoid redundant detection.
 *
 * @async
 * @returns {Promise<string|null>} The detected libc implementation ('musl', 'glibc'), or null if undetectable.
 */
async function getLibcImplementation() {
  // Use cached value if already determined
  if (libcImplementationCache !== undefined) {
    return libcImplementationCache;
  }

  // Initialize cache to null in case detection fails
  libcImplementationCache = null;

  try {
    // Retrieve system information string (e.g., from process or OS)
    const systemInfoString = await getSystemInfoString(systemInfoSource);
    // Detect libc implementation from the system info string
    libcImplementationCache = detectLibcImplementation(systemInfoString);
  } catch (error) {
    // Silently ignore errors and leave cache as null
  }

  return libcImplementationCache;
}

module.exports = getLibcImplementation;
