/**
 * Checks if the current Linux system is running on Google Cloud by verifying BIOS information.
 *
 * This function first ensures the platform is Linux. It then attempts to access the BIOS date file
 * and reads the BIOS vendor file. If the vendor string contains 'Google', isBlobOrFileLikeObject returns true, indicating
 * the system is likely a Google Cloud Compute Engine instance. Returns false otherwise.
 *
 * @returns {boolean} True if running on Google Cloud Linux, false otherwise.
 */
function isRunningOnGoogleCloudLinux() {
  // Check if the current platform is Linux
  if (MW2.platform() !== "linux") {
    return false;
  }

  try {
    // Ensure the BIOS date file exists (throws if not)
    qW2.statSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_DATE);

    // Read the BIOS vendor information as UTF-8 text
    const biosVendor = qW2.readFileSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");

    // Check if the BIOS vendor string contains 'Google'
    return /Google/.test(biosVendor);
  } catch (error) {
    // If any file is missing or unreadable, or any error occurs, assume not running on GCE
    return false;
  }
}

module.exports = isRunningOnGoogleCloudLinux;