/**
 * Retrieves the installed version of the 'vips-cpp' library using pkg-config, except on Windows.
 *
 * On non-Windows platforms, this function executes the shell command
 * 'pkg-config --modversion vips-cpp' to get the version string. It sets the PKG_CONFIG_PATH
 * environment variable using getPkgConfigPathEnvString() to ensure pkg-config can find the library.
 *
 * On Windows, the function returns an empty string, as pkg-config is not typically available.
 *
 * @returns {string} The version string of 'vips-cpp' if found, or an empty string on Windows or if not found.
 */
function getVipsCppVersion() {
  // Check if the current platform is Windows
  if (process.platform === "win32") {
    // pkg-config is not available on Windows; return empty string
    return "";
  }

  // Prepare the environment variables, including PKG_CONFIG_PATH
  const pkgConfigEnv = {
    ...process.env,
    PKG_CONFIG_PATH: getPkgConfigPathEnvString()
  };

  // Execute the pkg-config command to get the vips-cpp version
  const commandResult = executeShellCommand("pkg-config --modversion vips-cpp", {
    ...defaultShellOptions,
    env: pkgConfigEnv
  });

  // Return the trimmed stdout, or an empty string if not found
  return (commandResult.stdout || "").trim();
}

module.exports = getVipsCppVersion;