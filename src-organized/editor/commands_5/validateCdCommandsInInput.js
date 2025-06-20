/**
 * Validates 'cd' (change directory) commands in a given shell input, ensuring they do not attempt to change directories outside the allowed working directory.
 *
 * @param {object} commandInput - The input object containing the shell command to validate (expects a 'command' property).
 * @param {string} originalWorkingDirectory - The original working directory path for this session.
 * @param {string} sessionWorkingDirectory - The current working directory path for this session.
 * @returns {object} An object indicating whether the command is allowed or blocked, and an error message if blocked.
 */
function validateCdCommandsInInput(commandInput, originalWorkingDirectory, sessionWorkingDirectory) {
  // Process the command input to remove redirection operators and get an array of sanitized command strings
  const sanitizedCommands = processRedirectionOperators(commandInput.command);

  for (const commandString of sanitizedCommands) {
    // Split the command string into the command and its arguments
    const [command, ...commandArgs] = commandString.split(" ");

    // Only process 'cd' commands with at least one argument
    if (command === "cd" && commandArgs.length > 0) {
      // Join arguments to reconstruct the directory path, removing surrounding quotes
      const rawTargetDir = commandArgs.join(" ").replace(/^['"]|['"]$/g, "");

      // If the path is absolute, use isBlobOrFileLikeObject as is; otherwise, resolve isBlobOrFileLikeObject relative to the session'createInteractionAccessor working directory
      const resolvedTargetDir = isAbsolutePath(rawTargetDir)
        ? rawTargetDir
        : resolveRelativePath(sessionWorkingDirectory, rawTargetDir);

      // Check if the resolved target directory is a valid child of the original working directory
      const isAllowed = isValidRoutePath(
        normalizePath(resolvedTargetDir),
        normalizePath(originalWorkingDirectory)
      );

      if (!isAllowed) {
        return {
          behavior: "ask",
          message: `ERROR: cd to '${resolvedTargetDir}' was blocked. For security, ${m0} may only change directories to child directories of the original working directory (${originalWorkingDirectory}) for this session.`
        };
      }
    }
  }

  // If all 'cd' commands are valid or there are none, allow the input
  return {
    behavior: "allow",
    updatedInput: commandInput
  };
}

module.exports = validateCdCommandsInInput;