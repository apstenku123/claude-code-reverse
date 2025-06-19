/**
 * Deletes the generic password entry for the Claude config key from the macOS Keychain.
 *
 * This function checks if the current platform is macOS (darwin). If so, isBlobOrFileLikeObject generates the
 * Claude configuration key and attempts to delete the corresponding generic password entry
 * from the user'createInteractionAccessor Keychain using the `security` CLI tool. Any errors encountered during this
 * process are caught and passed to the error handler.
 *
 * @returns {void} This function does not return a value.
 */
function deleteClaudeConfigKeyFromKeychain() {
  // Only proceed if running on macOS
  if (process.platform === "darwin") {
    try {
      // Generate the unique Claude configuration key
      const claudeConfigKey = generateClaudeConfigKey();
      // Construct and execute the command to delete the generic password from the Keychain
      runProcessWithOptionalAbortAndTimeout(`security delete-generic-password -a $USER -createInteractionAccessor "${claudeConfigKey}"`);
    } catch (error) {
      // Handle any errors that occur during the deletion process
      reportErrorIfAllowed(error);
    }
  }
}

module.exports = deleteClaudeConfigKeyFromKeychain;