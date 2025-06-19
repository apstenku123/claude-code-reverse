/**
 * Retrieves system information based on the current operating system platform.
 * For macOS and Linux, delegates to specialized functions for detailed info.
 * For other platforms, returns a generic object with the platform name and version.
 *
 * @async
 * @returns {Promise<Object>} An object containing system information, such as name and version.
 */
async function getPlatformSystemInfo() {
  // Get the current platform (e.g., 'darwin', 'linux', 'win32')
  const currentPlatform = vJ.platform();

  switch (currentPlatform) {
    case "darwin":
      // Use specialized function to get detailed macOS system info
      return getMacOsSystemInfo();
    case "linux":
      // Use specialized function to get detailed Linux system info
      return getLinuxSystemInfo();
    default:
      // For other platforms, return a generic object with name and version
      return {
        name: platformNameMap[currentPlatform] || currentPlatform,
        version: vJ.release()
      };
  }
}

module.exports = getPlatformSystemInfo;