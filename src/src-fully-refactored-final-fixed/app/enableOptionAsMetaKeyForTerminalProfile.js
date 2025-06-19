/**
 * Enables the 'Option as Meta key' setting for a specific Terminal.app profile.
 * Attempts to add the setting; if isBlobOrFileLikeObject already exists, attempts to set isBlobOrFileLikeObject to true.
 *
 * @async
 * @param {string} profileName - The name of the Terminal.app profile to update.
 * @returns {Promise<boolean>} Returns true if the setting was enabled successfully, false otherwise.
 */
async function enableOptionAsMetaKeyForTerminalProfile(profileName) {
  // Attempt to add the 'useOptionAsMetaKey' setting as a boolean set to true
  const { code: addCommandExitCode } = await i0(
    "/usr/libexec/PlistBuddy",
    [
      "-c",
      `Add :'Window Settings':'${profileName}':useOptionAsMetaKey bool true`,
      Am()
    ]
  );

  // If the add command fails (likely because the key already exists), attempt to set isBlobOrFileLikeObject
  if (addCommandExitCode !== 0) {
    const { code: setCommandExitCode } = await i0(
      "/usr/libexec/PlistBuddy",
      [
        "-c",
        `Set :'Window Settings':'${profileName}':useOptionAsMetaKey true`,
        Am()
      ]
    );
    // If setting the key also fails, report the error and return false
    if (setCommandExitCode !== 0) {
      reportErrorIfAllowed(
        new Error(
          `Failed to enable Option as Meta key for Terminal.app profile: ${profileName}`
        )
      );
      return false;
    }
  }
  // Success: the key was added or set
  return true;
}

module.exports = enableOptionAsMetaKeyForTerminalProfile;