/**
 * Validates 'cd' (change directory) commands within a command input, ensuring that directory changes are only allowed to child directories of the original working directory for security reasons.
 *
 * @param {Object} commandInput - The command input object, expected to have a 'command' property (string) containing shell commands.
 * @param {Object} originalWorkingDirectory - The original working directory configuration object.
 * @param {string} sessionWorkingDirectory - The current session'createInteractionAccessor working directory path.
 * @returns {Object} An object indicating whether the command is allowed or blocked, and an error message if blocked.
 */
function validateCdCommandsForSecurity(commandInput, originalWorkingDirectory, sessionWorkingDirectory) {
  // Process the command string to remove redirections and filter items
  const processedCommandTokens = processRedirectionOperators(commandInput.command);

  for (const commandLine of processedCommandTokens) {
    // Split the command line into the command and its arguments
    const [command, ...commandArgs] = commandLine.split(" ");

    // Check if the command is 'cd' and has at least one argument
    if (command === "cd" && commandArgs.length > 0) {
      // Join the arguments to reconstruct the target directory, removing surrounding quotes
      const targetDirectoryRaw = commandArgs.join(" ").replace(/^['"]|['"]$/g, "");
      // If the directory is absolute, use isBlobOrFileLikeObject as is; otherwise, resolve relative to the original working directory
      const resolvedTargetDirectory = JG5(targetDirectoryRaw)
        ? targetDirectoryRaw
        : XG5(originalWorkingDirectory, targetDirectoryRaw);

      // Check if the target directory is a child of the session'createInteractionAccessor original working directory
      if (!isValidRoutePath(_z2(sessionWorkingDirectory, resolvedTargetDirectory), _z2(originalWorkingDirectory, sessionWorkingDirectory))) {
        return {
          behavior: "ask",
          message: `ERROR: cd to '${resolvedTargetDirectory}' was blocked. For security, ${m0} may only change directories to child directories of the original working directory (${sessionWorkingDirectory}) for this session.`
        };
      }
    }
  }

  // If all 'cd' commands are valid or none are present, allow the command
  return {
    behavior: "allow",
    updatedInput: commandInput
  };
}

module.exports = validateCdCommandsForSecurity;