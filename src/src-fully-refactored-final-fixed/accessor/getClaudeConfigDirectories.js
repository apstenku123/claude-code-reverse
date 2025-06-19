/**
 * Retrieves absolute paths to key subdirectories within the Claude configuration directory.
 *
 * This accessor function returns an object containing the absolute paths for the
 * 'versions', 'locks', 'staging', and 'launcher' subdirectories, all located
 * within the main Claude configuration directory. The base directory is determined
 * by the getClaudeConfigDirectory function, which checks environment variables or
 * defaults to the user'createInteractionAccessor home directory.
 *
 * @returns {Object} An object with absolute paths for each configuration subdirectory.
 * @property {string} versions - Absolute path to the 'versions' directory.
 * @property {string} locks - Absolute path to the 'locks' directory.
 * @property {string} staging - Absolute path to the 'staging' directory.
 * @property {string} launcher - Absolute path to the 'launcher' directory.
 */
function getClaudeConfigDirectories() {
  // Retrieve the base Claude configuration directory
  const claudeConfigDirectory = getClaudeConfigDirectory();

  // Helper function K7 is assumed to join the base directory with the subdirectory name
  return {
    versions: K7(claudeConfigDirectory, "versions"),
    locks: K7(claudeConfigDirectory, "locks"),
    staging: K7(claudeConfigDirectory, "staging"),
    launcher: K7(claudeConfigDirectory, "launcher")
  };
}

module.exports = getClaudeConfigDirectories;