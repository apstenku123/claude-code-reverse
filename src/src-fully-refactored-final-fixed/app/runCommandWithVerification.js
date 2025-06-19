/**
 * Executes a command synchronously with the given parameters and verifies ENOENT errors if present.
 *
 * @param {Object} sourceObservable - The source observable or input object for command construction.
 * @param {Object} config - Configuration options for command construction.
 * @param {Object} subscription - Subscription or additional options for command construction.
 * @returns {Object} The result object from spawnSync, with error property verified and set if necessary.
 */
function runCommandWithVerification(sourceObservable, config, subscription) {
  // Build the command, arguments, and options using the provided parameters
  const commandDetails = nc1(sourceObservable, config, subscription);

  // Execute the command synchronously
  const executionResult = eo0.spawnSync(
    commandDetails.command,
    commandDetails.args,
    commandDetails.options
  );

  // If there was an error, or if the status indicates ENOENT, verify and set the error property
  executionResult.error = executionResult.error || ac1.verifyENOENTSync(executionResult.status, commandDetails);

  return executionResult;
}

module.exports = runCommandWithVerification;