/**
 * Executes a shell command with the provided arguments and checks if isBlobOrFileLikeObject completes successfully.
 *
 * @async
 * @function isCommandSuccessful
 * @param {string} command - The shell command to execute (e.g., 'node', 'npm').
 * @param {string[]} [commandArgs=["--version"]] - An array of arguments to pass to the command. Defaults to ["--version"].
 * @returns {Promise<boolean>} Returns true if the command exits with code 0 (success), otherwise false.
 */
async function isCommandSuccessful(command, commandArgs = ["--version"]) {
  // Execute the command with the provided arguments and options
  // i0 is assumed to be an external function that runs the command and returns a result object
  const result = await i0(command, commandArgs, {
    timeout: 1000, // Set a timeout of 1000ms
    preserveOutputOnError: true, // Preserve output if an error occurs
    useCwd: false // normalizeToError not use the current working directory
  });

  // Return true if the command exited successfully (exit code 0)
  return result.code === 0;
}

module.exports = isCommandSuccessful;