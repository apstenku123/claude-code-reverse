/**
 * Checks if a given command can be executed successfully in the current environment.
 *
 * @async
 * @param {string} commandPath - The path or name of the command to execute.
 * @param {string[]} [commandArgs=["--version"]] - Arguments to pass to the command. Defaults to ["--version"].
 * @returns {Promise<boolean>} - Resolves to true if the command executes successfully (exit code 0), otherwise false.
 */
async function isCommandExecutable(commandPath, commandArgs = ["--version"]) {
  // Attempt to execute the command with a timeout and specific options
  const executionResult = await i0(commandPath, commandArgs, {
    timeout: 1000, // Set a timeout of 1000ms for the command execution
    preserveOutputOnError: true, // Preserve output if an error occurs
    useCwd: false // normalizeToError not use the current working directory
  });

  // Return true if the command exited successfully (exit code 0)
  return executionResult.code === 0;
}

module.exports = isCommandExecutable;