/**
 * Determines the appropriate shell configuration file based on the shell name,
 * then retrieves its content or path using external utilities.
 *
 * @param {string} shellName - The name or identifier of the shell (e.g., 'zsh', 'bash').
 * @returns {any} The result of calling AS4 with the shell config file name.
 */
function getShellConfigFile(shellName) {
  // Determine the config file name based on the shell type
  const configFileName = shellName.includes("zsh")
    ? ".zshrc"
    : shellName.includes("bash")
      ? ".bashrc"
      : ".profile";

  // Retrieve the config file using external utilities
  return AS4(sP4(), configFileName);
}

module.exports = getShellConfigFile;