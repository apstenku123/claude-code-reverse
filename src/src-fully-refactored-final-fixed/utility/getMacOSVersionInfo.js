/**
 * Retrieves detailed macOS version information, including kernel version, product name, version, and build number.
 * Attempts to use the 'sw_vers' system command for accurate data, falling back to kernel info if unavailable.
 *
 * @async
 * @returns {Promise<Object>} An object containing macOS version details: kernel_version, name, version, and optionally build.
 */
async function getMacOSVersionInfo() {
  // Initialize with kernel-based fallback values
  const kernelRelease = vJ.release();
  const majorKernelVersion = Number(kernelRelease.split(".")[0]);
  const macOSVersion = `10.${majorKernelVersion - 4}`;

  /**
   * Version info object to be returned. Will be updated if sw_vers output is available.
   * @type {{ kernel_version: string, name: string, version: string, build?: string }}
   */
  const versionInfo = {
    kernel_version: kernelRelease,
    name: "Mac OS X",
    version: macOSVersion
  };

  try {
    // Attempt to get detailed version info using the sw_vers system command
    const swVersOutput = await new Promise((resolve, reject) => {
      $Q9.execFile("/usr/bin/sw_vers", (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout);
      });
    });

    // Extract ProductName, ProductVersion, and BuildVersion from sw_vers output
    versionInfo.name = getFirstRegexGroupMatch(/^ProductName:\s+(.*)$/m, swVersOutput);
    versionInfo.version = getFirstRegexGroupMatch(/^ProductVersion:\s+(.*)$/m, swVersOutput);
    versionInfo.build = getFirstRegexGroupMatch(/^BuildVersion:\s+(.*)$/m, swVersOutput);
  } catch (swVersError) {
    // If sw_vers fails, fallback to kernel-based info (already set)
  }

  return versionInfo;
}

module.exports = getMacOSVersionInfo;