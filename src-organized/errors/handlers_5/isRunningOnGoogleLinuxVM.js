/**
 * Checks if the current environment is a Google Compute Engine (GCE) Linux virtual machine.
 *
 * This function verifies that the platform is Linux, then checks for the existence of specific BIOS files
 * and reads the BIOS vendor information to determine if the machine is running on Google infrastructure.
 *
 * @returns {boolean} True if running on a Google Linux VM, false otherwise.
 */
function isRunningOnGoogleLinuxVM() {
  // Check if the current platform is Linux
  if (MW2.platform() !== "linux") {
    return false;
  }
  try {
    // Ensure the BIOS date file exists (throws if not found)
    qW2.statSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_DATE);
    // Read the BIOS vendor information as UTF-8 text
    const biosVendor = qW2.readFileSync(PW2.GCE_LINUX_BIOS_PATHS.BIOS_VENDOR, "utf8");
    // Check if the BIOS vendor contains 'Google'
    return /Google/.test(biosVendor);
  } catch (error) {
    // If any file is missing or unreadable, or the regex fails, return false
    return false;
  }
}

module.exports = isRunningOnGoogleLinuxVM;