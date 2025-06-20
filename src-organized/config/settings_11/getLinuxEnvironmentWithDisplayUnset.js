/**
 * Returns a copy of the current process environment variables with the DISPLAY variable unset (set to an empty string),
 * but only if the current operating system is Linux. Otherwise, returns undefined.
 *
 * @returns {Object|undefined} An object containing the environment variables with DISPLAY unset if on Linux, otherwise undefined.
 */
function getLinuxEnvironmentWithDisplayUnset() {
  // Determine the current operating system using rQ()
  const currentOperatingSystem = rQ();

  // If the OS is Linux, return a copy of process.env with DISPLAY set to an empty string
  if (currentOperatingSystem === "linux") {
    return {
      ...process.env,
      DISPLAY: ""
    };
  }

  // For non-Linux systems, return undefined
  return undefined;
}

module.exports = getLinuxEnvironmentWithDisplayUnset;