/**
 * Retrieves the PKG_CONFIG_PATH environment variable value for non-Windows platforms.
 *
 * This function attempts to determine the appropriate PKG_CONFIG_PATH by:
 *   1. Running a shell command to extract PKG_CONFIG_LIBDIR from Homebrew (if available)
 *   2. Including the current process.env.PKG_CONFIG_PATH
 *   3. Adding common pkg-config directories for Unix-like systems
 * The resulting paths are filtered to remove any empty values and joined with ':' as a separator.
 *
 * @returns {string} The constructed PKG_CONFIG_PATH string, or an empty string on Windows platforms.
 */
function getPkgConfigPathEnv() {
  // Only run on non-Windows platforms
  if (process.platform !== "win32") {
    // Attempt to extract PKG_CONFIG_LIBDIR from Homebrew, if installed
    const homebrewPkgConfigLibdir = (
      yV1(
        'which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2',
        xV1
      ).stdout || ""
    ).trim();

    // Collect possible pkg-config paths
    const pkgConfigPaths = [
      homebrewPkgConfigLibdir, // From Homebrew
      process.env.PKG_CONFIG_PATH, // From environment
      "/usr/local/lib/pkgconfig",
      "/usr/lib/pkgconfig",
      "/usr/local/libdata/pkgconfig",
      "/usr/libdata/pkgconfig"
    ];

    // Filter out any empty values and join with ':'
    return pkgConfigPaths.filter(Boolean).join(":");
  } else {
    // On Windows, return an empty string
    return "";
  }
}

module.exports = getPkgConfigPathEnv;
