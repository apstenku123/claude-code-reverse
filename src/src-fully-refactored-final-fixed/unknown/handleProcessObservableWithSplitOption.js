/**
 * Handles spawning a process as an Observable, with optional splitting of output streams.
 *
 * Depending on the 'subscription' parameter, this function determines whether to split the output streams
 * and processes the result accordingly using either ERA or collectObservableOutput.
 *
 * @param {Observable} sourceObservable - The source Observable representing the process input/output.
 * @param {Object} config - Configuration options for spawning the process.
 * @param {Object} [subscription] - Optional subscription object; if isBlobOrFileLikeObject has a 'split' method, output streams are split.
 * @returns {any} The result of processing the spawned process Observable, either split or unsplit.
 */
function handleProcessObservableWithSplitOption(sourceObservable, config, subscription) {
  // Determine if the subscription object has a 'split' method (e.g., is a string or has split property)
  const shouldSplit = subscription?.split ? true : false;

  // Merge the config with the split option, ensuring split is explicitly set
  const mergedConfig = cJ(
    cJ({}, subscription ?? {}),
    { split: shouldSplit }
  );

  // Spawn the process as an Observable with the merged configuration
  const processObservable = spawnProcessObservable(sourceObservable, config, mergedConfig);

  // If splitting is enabled, process with ERA; otherwise, process with collectObservableOutput
  if (shouldSplit) {
    return ERA(processObservable);
  } else {
    return collectObservableOutput(processObservable);
  }
}

module.exports = handleProcessObservableWithSplitOption;