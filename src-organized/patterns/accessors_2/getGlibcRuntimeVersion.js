/**
 * Retrieves the glibc runtime version from the system header information, if available.
 *
 * @returns {string|null} The glibc runtime version string if present, otherwise null.
 */
function getGlibcRuntimeVersion() {
  // Retrieve system information using SK2 (external dependency)
  const systemInfo = SK2();

  // Check if header and glibcVersionRuntime exist in the system info
  if (systemInfo.header && systemInfo.header.glibcVersionRuntime) {
    return systemInfo.header.glibcVersionRuntime;
  }

  // Return null if glibcVersionRuntime is not found
  return null;
}

module.exports = getGlibcRuntimeVersion;
