/**
 * Retrieves accessor functions for various Claude configuration files.
 *
 * This function returns an object containing accessor functions for the
 * 'versions', 'locks', 'staging', and 'launcher' configuration files
 * located in the Claude configuration directory. Each accessor is created
 * by calling the external K7 function with the configuration directory path
 * and the respective file name.
 *
 * @returns {Object} An object with accessor functions for each configuration file:
 *   - versions: Accessor for the 'versions' config file
 *   - locks: Accessor for the 'locks' config file
 *   - staging: Accessor for the 'staging' config file
 *   - launcher: Accessor for the 'launcher' config file
 */
function getClaudeConfigAccessors() {
  // Retrieve the path to the Claude configuration directory
  const configDirectoryPath = getClaudeConfigDirectory();

  // Return an object mapping each config file to its accessor
  return {
    versions: K7(configDirectoryPath, "versions"),
    locks: K7(configDirectoryPath, "locks"),
    staging: K7(configDirectoryPath, "staging"),
    launcher: K7(configDirectoryPath, "launcher")
  };
}

module.exports = getClaudeConfigAccessors;