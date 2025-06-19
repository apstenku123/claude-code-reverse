/**
 * Processes an observable with a configurable split option.
 *
 * Depending on whether the `subscription` parameter has a `split` property (or method),
 * this function merges the provided configuration with a `split` flag (true or false),
 * then passes the result to the appropriate handler function.
 *
 * @param {Object} sourceObservable - The observable or data source to process.
 * @param {Object} config - Configuration options for processing the observable.
 * @param {Object} [subscription] - Optional subscription object that may contain a `split` property or method.
 * @returns {any} The result of processing the observable, possibly split or not, depending on the subscription.
 */
function processObservableWithSplitOption(sourceObservable, config, subscription) {
  // Determine if the subscription object has a 'split' property or method
  const hasSplit = subscription?.split;

  // Merge the config with the split flag based on the presence of 'split' in subscription
  const mergedConfig = {
    ...((subscription !== null && subscription !== undefined) ? subscription : {}),
    split: Boolean(hasSplit)
  };

  // Process the observable with the merged configuration
  const processedObservable = spawnJobberProcess(sourceObservable, config, mergedConfig);

  // If 'split' is present, use ERA to handle the split observable; otherwise, use collectObservableOutput
  if (hasSplit) {
    return ERA(processedObservable);
  } else {
    // For the non-split case, ensure split is set to false in the config
    const nonSplitConfig = {
      ...((subscription !== null && subscription !== undefined) ? subscription : {}),
      split: false
    };
    const nonSplitProcessedObservable = spawnJobberProcess(sourceObservable, config, nonSplitConfig);
    return collectObservableOutput(nonSplitProcessedObservable);
  }
}

module.exports = processObservableWithSplitOption;