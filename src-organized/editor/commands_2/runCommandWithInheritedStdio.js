/**
 * Executes a shell command constructed from a base command and an argument, inheriting stdio from the parent process.
 *
 * @async
 * @function runCommandWithInheritedStdio
 * @param {string} commandArgument - The argument to append to the base command when executing.
 * @returns {Promise<void>} Resolves when the command has been executed.
 *
 * @example
 * await runCommandWithInheritedStdio('install');
 */
async function runCommandWithInheritedStdio(commandArgument) {
  // Retrieve the base command asynchronously
  const baseCommand = await EH5();

  // Execute the full command with the provided argument, inheriting stdio
  wH5(`${baseCommand} "${commandArgument}"`, {
    stdio: "inherit"
  });
}

module.exports = runCommandWithInheritedStdio;