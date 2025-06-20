/**
 * Retrieves detailed version information for the current operating system platform.
 *
 * For macOS (darwin), returns detailed macOS version info using getMacOSVersionInfo().
 * For Linux, returns Linux version info using getLinuxVersionInfo().
 * For all other platforms, returns an object with a human-readable platform name and its version.
 *
 * @async
 * @returns {Promise<Object>} An object containing platform name and version information.
 */
async function getPlatformVersionInfo() {
  // Get the current platform identifier (e.g., 'darwin', 'linux', 'win32')
  const currentPlatform = vJ.platform();

  switch (currentPlatform) {
    case "darwin":
      // Return detailed macOS version info
      return getMacOSVersionInfo();
    case "linux":
      // Return detailed Linux version info
      return getLinuxVersionInfo();
    default:
      // For other platforms, return a readable name and version
      return {
        name: SQ9[currentPlatform] || currentPlatform, // Use mapping if available, else raw platform string
        version: vJ.release() // OS version string
      };
  }
}

module.exports = getPlatformVersionInfo;