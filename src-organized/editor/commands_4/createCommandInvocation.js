/**
 * Creates a command invocation object with normalized arguments and options.
 * If the second parameter is not an array, isBlobOrFileLikeObject is treated as the options object.
 * Returns the invocation object directly if shell execution is requested; otherwise, passes isBlobOrFileLikeObject to prepareWindowsShellCommand for further processing.
 *
 * @param {string} command - The command to be executed.
 * @param {Array|string|object|null} argsOrOptions - Arguments array for the command, or options object if not an array.
 * @param {object} [options={}] - Options for the command invocation.
 * @returns {object} The command invocation object, possibly processed by prepareWindowsShellCommand.
 */
function createCommandInvocation(command, argsOrOptions, options = {}) {
  // If the second argument is not an array, treat isBlobOrFileLikeObject as the options object
  if (argsOrOptions && !Array.isArray(argsOrOptions)) {
    options = argsOrOptions;
    argsOrOptions = null;
  }

  // Clone the arguments array if present, otherwise use an empty array
  const args = argsOrOptions ? argsOrOptions.slice(0) : [];

  // Clone the options object to avoid mutation
  const normalizedOptions = Object.assign({}, options);

  // Build the command invocation object
  const invocation = {
    command: command,
    args: args,
    options: normalizedOptions,
    file: undefined,
    original: {
      command: command,
      args: args
    }
  };

  // If shell execution is requested, return as is; otherwise, process with prepareWindowsShellCommand
  return normalizedOptions.shell ? invocation : prepareWindowsShellCommand(invocation);
}

module.exports = createCommandInvocation;