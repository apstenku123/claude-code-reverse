/**
 * Retrieves the PKG_CONFIG_PATH for non-Windows platforms by combining values from Homebrew, environment variables, and standard pkg-config directories.
 *
 * @returns {string} The colon-separated PKG_CONFIG_PATH string, or an empty string on Windows platforms.
 */
function getPkgConfigPath() {
  // Only proceed if the platform is not Windows
  if (process.platform !== "win32") {
    // Attempt to get PKG_CONFIG_LIBDIR from Homebrew, if available
    const homebrewPkgConfigLibdir = (
      yV1(
        'which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2',
        xV1
      ).stdout || ""
    ).trim();

    // Collect possible pkg-config paths
    const pkgConfigPaths = [
      homebrewPkgConfigLibdir, // From Homebrew
      process.env.PKG_CONFIG_PATH, // From environment variable
      "/usr/local/lib/pkgconfig",
      "/usr/lib/pkgconfig",
      "/usr/local/libdata/pkgconfig",
      "/usr/libdata/pkgconfig"
    ];

    // Filter out any falsy values and join with ':'
    return pkgConfigPaths.filter(Boolean).join(":");
  } else {
    // On Windows, return an empty string
    return "";
  }
}

module.exports = getPkgConfigPath;