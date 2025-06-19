/**
 * Collects and aggregates data from multiple asynchronous sources with a timeout-based abort mechanism.
 *
 * This function orchestrates several asynchronous data collection and processing operations, aborting them if they exceed a 1-second timeout.
 * It merges the results from all sources into a single array.
 *
 * @param {any} sourceObservable - The main data source or observable to process (may be null/undefined).
 * @param {object} config - Configuration object for data collection and processing.
 * @param {any} subscription - Subscription or context object for downstream operations.
 * @param {any} inputData - Additional input data for downstream operations.
 * @returns {Promise<any[]>} - Promise resolving to a merged array of results from all sources.
 */
async function collectAndAggregateDataWithTimeout(sourceObservable, config, subscription, inputData) {
  // Create an AbortController to allow aborting async operations after a timeout
  const abortController = new AbortController();

  // Set a timeout to abort the controller after 1 second
  setTimeout(() => {
    abortController.abort();
  }, 1000);

  // Merge the config with the abortController for downstream use
  const configWithAbort = {
    ...config,
    abortController
  };

  // Prepare all async operations to run in parallel
  // Use 'executeProcessInteractionEntriesSafely' as a wrapper for each async operation (assumed to handle retries or logging)
  // If sourceObservable is falsy, resolve to an empty array for the first two operations
  const [
    aggregatedEntries,           // Result from extractMentionedFilesOrDirectories
    extractedEntries,            // Result from XD5
    collectedEntries,            // Result from getChangedWatchedFiles
    processedSubscription,       // Result from getSelectedLinesInIDE
    processedSubscriptionMeta,   // Result from getOpenedFileInteractionEntries
    validatedEntries,            // Result from collectMissingNestedMemoryAttachments
    yieldedEntries,              // Result from YD5
    processedInputData,          // Result from extractQueuedPromptCommands
    additionalEntries,           // Result from getNewDiagnosticsReport
    processedConfigEntries       // Result from DD5
  ] = await Promise.all([
    sourceObservable ? executeProcessInteractionEntriesSafely(() => extractMentionedFilesOrDirectories(sourceObservable, configWithAbort)) : Promise.resolve([]),
    sourceObservable ? executeProcessInteractionEntriesSafely(() => XD5(sourceObservable, configWithAbort)) : Promise.resolve([]),
    executeProcessInteractionEntriesSafely(() => getChangedWatchedFiles(configWithAbort)),
    executeProcessInteractionEntriesSafely(async () => getSelectedLinesInIDE(subscription, config)),
    executeProcessInteractionEntriesSafely(async () => getOpenedFileInteractionEntries(subscription)),
    executeProcessInteractionEntriesSafely(() => collectMissingNestedMemoryAttachments(configWithAbort)),
    executeProcessInteractionEntriesSafely(async () => Promise.resolve(YD5())),
    executeProcessInteractionEntriesSafely(async () => extractQueuedPromptCommands(inputData)),
    executeProcessInteractionEntriesSafely(async () => getNewDiagnosticsReport()),
    executeProcessInteractionEntriesSafely(async () => Promise.resolve(DD5(config)))
  ]);

  // Merge all results into a single array and return
  return [
    ...aggregatedEntries,
    ...extractedEntries,
    ...collectedEntries,
    ...processedSubscription,
    ...processedSubscriptionMeta,
    ...validatedEntries,
    ...yieldedEntries,
    ...processedInputData,
    ...additionalEntries,
    ...processedConfigEntries
  ];
}

module.exports = collectAndAggregateDataWithTimeout;