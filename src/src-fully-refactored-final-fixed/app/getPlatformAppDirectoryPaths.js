/**
 * Generates and returns standard application directory paths (data, config, cache, log, temp)
 * for the given application name, with an optional suffix, based on the current operating system.
 *
 * On macOS, uses getAppDirectoryPaths for macOS conventions.
 * On Windows, uses getAppDirectoryPaths for Windows conventions.
 * On other platforms, uses getAppDataPaths (XDG or fallback conventions).
 *
 * @param {string} applicationName - The base name of the application.
 * @param {Object} [options] - Optional configuration object.
 * @param {string} [options.suffix="nodejs"] - Suffix to append to the application name (default: "nodejs").
 * @returns {Object} An object containing absolute paths for data, config, cache, log, and temp directories.
 * @throws {TypeError} If applicationName is not a string.
 */
function getPlatformAppDirectoryPaths(applicationName, { suffix = "nodejs" } = {}) {
  // Validate input type
  if (typeof applicationName !== "string") {
    throw new TypeError(`Expected a string, got ${typeof applicationName}`);
  }

  // Append suffix if provided
  let fullAppName = applicationName;
  if (suffix) {
    fullAppName += `-${suffix}`;
  }

  // Determine platform and delegate to the appropriate function
  if (YM1.platform === "darwin") {
    // macOS: use getAppDirectoryPaths for macOS conventions
    return getAppDirectoryPaths(fullAppName);
  }
  if (YM1.platform === "win32") {
    // Windows: use getAppDirectoryPaths for Windows conventions
    return getAppDirectoryPaths(fullAppName);
  }
  // Other platforms: use getAppDataPaths (XDG or fallback conventions)
  return getAppDataPaths(fullAppName);
}

module.exports = getPlatformAppDirectoryPaths;