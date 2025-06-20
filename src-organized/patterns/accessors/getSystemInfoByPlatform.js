/**
 * Retrieves system information based on the current operating system platform.
 * For macOS and Linux, delegates to specialized functions. For other platforms,
 * returns a generic object with the platform name and version.
 *
 * @async
 * @returns {Promise<Object>} An object containing system information relevant to the platform.
 */
async function getSystemInfoByPlatform() {
  // Get the current platform (e.g., 'darwin', 'linux', 'win32', etc.)
  const currentPlatform = vJ.platform();

  switch (currentPlatform) {
    case "darwin":
      // macOS: Use specialized function to get detailed system info
      return getMacOsSystemInfo();
    case "linux":
      // Linux: Use specialized function to get detailed system info
      return getLinuxSystemInfo();
    default:
      // Other platforms: Return generic info with mapped name if available
      return {
        name: SQ9[currentPlatform] || currentPlatform,
        version: vJ.release()
      };
  }
}

module.exports = getSystemInfoByPlatform;