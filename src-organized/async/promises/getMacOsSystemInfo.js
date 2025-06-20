/**
 * Retrieves detailed macOS system information including kernel version, OS name, version, and build number.
 * Attempts to use the 'sw_vers' command for accurate details, falling back to Node'createInteractionAccessor os.release() if unavailable.
 *
 * @async
 * @returns {Promise<Object>} An object containing macOS system information: kernel_version, name, version, and optionally build.
 */
async function getMacOsSystemInfo() {
  // Initialize systemInfo with basic kernel version and default macOS name/version
  const systemInfo = {
    kernel_version: vJ.release(),
    name: "Mac OS X",
    // Derive version from kernel version (Darwin major version - 4)
    version: `10.${Number(vJ.release().split(".")[0]) - 4}`
  };

  try {
    // Execute 'sw_vers' to get detailed macOS version information
    const swVersOutput = await new Promise((resolve, reject) => {
      $Q9.execFile("/usr/bin/sw_vers", (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });

    // Extract ProductName, ProductVersion, and BuildVersion using getFirstRegexGroupMatch regex helper
    systemInfo.name = getFirstRegexGroupMatch(/^ProductName:\s+(.*)$/m, swVersOutput);
    systemInfo.version = getFirstRegexGroupMatch(/^ProductVersion:\s+(.*)$/m, swVersOutput);
    systemInfo.build = getFirstRegexGroupMatch(/^BuildVersion:\s+(.*)$/m, swVersOutput);
  } catch (error) {
    // If sw_vers fails, fallback to initial values
  }

  return systemInfo;
}

module.exports = getMacOsSystemInfo;