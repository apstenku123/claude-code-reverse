/**
 * Retrieves a colon-separated string of PKG_CONFIG_PATH directories for Unix-like systems.
 *
 * On non-Windows platforms, this function attempts to extract the PKG_CONFIG_LIBDIR value from Homebrew (if installed),
 * includes the current process'createInteractionAccessor PKG_CONFIG_PATH, and appends several standard pkg-config directories.
 * All valid (truthy) paths are joined by colons. On Windows, an empty string is returned.
 *
 * @returns {string} Colon-separated list of pkg-config search paths, or an empty string on Windows.
 */
function getPkgConfigPathEnvString() {
  // Only proceed if not running on Windows
  if (process.platform !== "win32") {
    // Attempt to get PKG_CONFIG_LIBDIR from Homebrew, if available
    // yV1 runs a shell command and returns an object with a 'stdout' property
    const homebrewPkgConfigLibDir = (
      yV1(
        'which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2',
        xV1
      ).stdout || ""
    ).trim();

    // Collect all possible pkg-config paths
    const pkgConfigPaths = [
      homebrewPkgConfigLibDir, // From Homebrew, if available
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

module.exports = getPkgConfigPathEnvString;
