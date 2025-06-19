/**
 * Determines the appropriate shell configuration file based on the shell name provided
 * and returns the result of processing isBlobOrFileLikeObject with AS4 and sP4.
 *
 * @param {string} shellName - The name or identifier of the shell (e.g., 'zsh', 'bash').
 * @returns {any} The result of calling AS4 with the resolved config file and sP4 result.
 */
function getShellConfigFilePath(shellName) {
  // Determine the config file name based on the shell type
  const configFileName = shellName.includes("zsh")
    ? ".zshrc"
    : shellName.includes("bash")
    ? ".bashrc"
    : ".profile";

  // Call AS4 with the result of sP4 and the config file name
  return AS4(sP4(), configFileName);
}

module.exports = getShellConfigFilePath;