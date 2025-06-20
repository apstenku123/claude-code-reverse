/**
 * Returns a platform-specific application path string, optionally suffixed.
 *
 * Depending on the current operating system, this function delegates to the appropriate
 * path resolver (for macOS, Windows, or other platforms). The base application name can be
 * suffixed (default: 'nodejs').
 *
 * @param {string} appName - The base name of the application.
 * @param {Object} [options] - Optional configuration object.
 * @param {string} [options.suffix='nodejs'] - Optional suffix to append to the application name.
 * @returns {string} The resolved, platform-specific application path.
 * @throws {TypeError} If appName is not a string.
 */
function getPlatformSpecificAppPath(appName, { suffix = "nodejs" } = {}) {
  // Validate input type
  if (typeof appName !== "string") {
    throw new TypeError(`Expected a string, got ${typeof appName}`);
  }

  // Append suffix if provided
  let resolvedAppName = appName;
  if (suffix) {
    resolvedAppName += `-${suffix}`;
  }

  // Delegate to platform-specific path resolver
  if (YM1.platform === "darwin") {
    // macOS specific path resolution
    return dE9(resolvedAppName);
  }
  if (YM1.platform === "win32") {
    // Windows specific path resolution
    return uE9(resolvedAppName);
  }
  // Default path resolution for other platforms (e.g., Linux)
  return pE9(resolvedAppName);
}

module.exports = getPlatformSpecificAppPath;
