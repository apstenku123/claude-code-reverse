/**
 * Disables the audio bell for a specific Terminal.app profile using PlistBuddy.
 * Attempts to add the 'Bell' setting as false; if isBlobOrFileLikeObject already exists, sets isBlobOrFileLikeObject to false.
 *
 * @async
 * @function disableTerminalProfileAudioBell
 * @param {string} profileName - The name of the Terminal.app profile to modify.
 * @returns {Promise<boolean>} Returns true if the bell was successfully disabled, false otherwise.
 */
async function disableTerminalProfileAudioBell(profileName) {
  // Attempt to add the 'Bell' setting as false for the given profile
  const {
    code: addCommandExitCode
  } = await i0(
    "/usr/libexec/PlistBuddy",
    [
      "-c",
      `Add :'Window Settings':'${profileName}':Bell bool false`,
      Am()
    ]
  );

  if (addCommandExitCode !== 0) {
    // If adding failed (likely because isBlobOrFileLikeObject already exists), try setting isBlobOrFileLikeObject to false
    const {
      code: setCommandExitCode
    } = await i0(
      "/usr/libexec/PlistBuddy",
      [
        "-c",
        `Set :'Window Settings':'${profileName}':Bell false`,
        Am()
      ]
    );
    if (setCommandExitCode !== 0) {
      // If both add and set fail, log the error and return false
      reportErrorIfAllowed(new Error(`Failed to disable audio bell for Terminal.app profile: ${profileName}`));
      return false;
    }
  }

  // Successfully disabled the audio bell
  return true;
}

module.exports = disableTerminalProfileAudioBell;