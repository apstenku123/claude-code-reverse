/**
 * Retrieves the system'createInteractionAccessor name and release version using the 'uname -sr' command.
 * If the command fails, returns 'unknown'.
 *
 * @async
 * @returns {Promise<string>} The system name and release (e.g., 'Linux 5.15.0'), or 'unknown' if retrieval fails.
 */
async function getSystemNameAndRelease() {
  try {
    // Execute the 'uname -sr' command to get system name and release
    const { stdout: systemNameAndRelease } = await i0("uname", ["-sr"], {
      preserveOutputOnError: false
    });
    // Trim any leading/trailing whitespace from the result
    return systemNameAndRelease.trim();
  } catch (error) {
    // If the command fails, return 'unknown'
    return "unknown";
  }
}

module.exports = getSystemNameAndRelease;