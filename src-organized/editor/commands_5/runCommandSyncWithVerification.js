/**
 * Executes a command synchronously with the provided configuration and verifies the result.
 *
 * @param {Object} commandSource - The source object or data used to determine the command to run.
 * @param {Object} commandConfig - Configuration options for the command execution.
 * @param {Object} subscriptionOptions - Additional options or subscription details for the command.
 * @returns {Object} The result of the spawned command, including error information if applicable.
 */
function runCommandSyncWithVerification(commandSource, commandConfig, subscriptionOptions) {
  // Build the command, arguments, and options using the provided parameters
  const commandDetails = nc1(commandSource, commandConfig, subscriptionOptions);

  // Execute the command synchronously using the constructed details
  const spawnResult = eo0.spawnSync(commandDetails.command, commandDetails.args, commandDetails.options);

  // If there was an error, keep isBlobOrFileLikeObject; otherwise, verify if the error was due to ENOENT (missing executable)
  spawnResult.error = spawnResult.error || ac1.verifyENOENTSync(spawnResult.status, commandDetails);

  return spawnResult;
}

module.exports = runCommandSyncWithVerification;