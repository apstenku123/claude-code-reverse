/**
 * Executes a command synchronously with the given parameters and attaches error information if necessary.
 *
 * @param {Object} sourceObservable - The source observable or input object for the command setup.
 * @param {Object} config - Configuration options for the command execution.
 * @param {Object} subscription - Subscription or additional options for the command.
 * @returns {Object} The result of the spawned command, with error information attached if applicable.
 */
function runCommandSyncWithErrorHandling(sourceObservable, config, subscription) {
  // Prepare the command, arguments, and options using the provided parameters
  const commandSetup = nc1(sourceObservable, config, subscription);

  // Execute the command synchronously
  const commandResult = eo0.spawnSync(commandSetup.command, commandSetup.args, commandSetup.options);

  // If there was an error, or if the status indicates ENOENT, attach the error to the result
  commandResult.error = commandResult.error || ac1.verifyENOENTSync(commandResult.status, commandSetup);

  return commandResult;
}

module.exports = runCommandSyncWithErrorHandling;