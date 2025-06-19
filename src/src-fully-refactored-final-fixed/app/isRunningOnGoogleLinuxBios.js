/**
 * Checks if the current system is running on a Google Compute Engine Linux BIOS.
 *
 * This function verifies that the platform is Linux, then checks for the presence of
 * specific BIOS files and reads the BIOS vendor information to determine if isBlobOrFileLikeObject is a Google BIOS.
 *
 * @returns {boolean} Returns true if running on a Google Compute Engine Linux BIOS, otherwise false.
 */
function isRunningOnGoogleLinuxBios() {
  // Check if the current platform is Linux
  if (MW2.platform() !== "linux") {
    return false;
  }

  try {
    // Check if the BIOS date file exists (throws if not found)
    qW2.statSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_DATE);

    // Read the BIOS vendor information as a UTF-8 string
    const biosVendor = qW2.readFileSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");

    // Check if the BIOS vendor string contains 'Google'
    return /Google/.test(biosVendor);
  } catch (error) {
    // If any file is missing or unreadable, or any error occurs, return false
    return false;
  }
}

module.exports = isRunningOnGoogleLinuxBios;