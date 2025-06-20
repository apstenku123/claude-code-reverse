/**
 * Aggregates multiple asynchronous data sources, with abort support and configurable options.
 *
 * This function concurrently fetches and processes data from several asynchronous sources, using an AbortController to enforce a timeout. It merges the results from all sources into a single array. The function is designed to be flexible, supporting optional sources and custom configuration.
 *
 * @async
 * @function aggregateAsyncDataWithAbort
 * @param {any} sourceObservable - The primary data source or observable to process (may be null/undefined).
 * @param {object} config - Configuration object for data processing and fetch options.
 * @param {any} subscription - Subscription or context object for certain data fetches.
 * @param {any} inputData - Additional input data for downstream processing.
 * @returns {Promise<any[]>} a promise that resolves to an array containing merged results from all data sources.
 */
async function aggregateAsyncDataWithAbort(sourceObservable, config, subscription, inputData) {
  // Create an AbortController to allow aborting async operations after a timeout
  const abortController = new AbortController();
  // Set a timeout to abort after 1 second
  setTimeout(() => {
    abortController.abort();
  }, 1000);

  // Merge the provided config with the abortController
  const configWithAbort = {
    ...config,
    abortController
  };

  // Prepare all async data fetches, some conditional on sourceObservable
  const asyncTasks = [
    // If sourceObservable is provided, fetch extractMentionedFilesOrDirectories and XD5, else resolve to empty arrays
    sourceObservable ? executeProcessInteractionEntriesSafely(() => extractMentionedFilesOrDirectories(sourceObservable, configWithAbort)) : Promise.resolve([]),
    sourceObservable ? executeProcessInteractionEntriesSafely(() => XD5(sourceObservable, configWithAbort)) : Promise.resolve([]),
    // Always fetch getChangedWatchedFiles
    executeProcessInteractionEntriesSafely(() => getChangedWatchedFiles(configWithAbort)),
    // Fetch getSelectedLinesInIDE and getOpenedFileInteractionEntries with subscription context
    executeProcessInteractionEntriesSafely(async () => getSelectedLinesInIDE(subscription, config)),
    executeProcessInteractionEntriesSafely(async () => getOpenedFileInteractionEntries(subscription)),
    // Fetch collectMissingNestedMemoryAttachments
    executeProcessInteractionEntriesSafely(() => collectMissingNestedMemoryAttachments(configWithAbort)),
    // Fetch YD5 (wrapped in Promise.resolve for consistency)
    executeProcessInteractionEntriesSafely(async () => Promise.resolve(YD5())),
    // Fetch extractQueuedPromptCommands with inputData
    executeProcessInteractionEntriesSafely(async () => extractQueuedPromptCommands(inputData)),
    // Fetch getNewDiagnosticsReport
    executeProcessInteractionEntriesSafely(async () => getNewDiagnosticsReport()),
    // Fetch DD5 with config (wrapped in Promise.resolve)
    executeProcessInteractionEntriesSafely(async () => Promise.resolve(DD5(config)))
  ];

  // Await all async tasks concurrently
  const [
    jd5Results,
    xd5Results,
    cd5Results,
    wd5Results,
    fd5Results,
    vd5Results,
    yd5Results,
    zd5Results,
    wd5AltResults,
    dd5Results
  ] = await Promise.all(asyncTasks);

  // Merge all results into a single array and return
  return [
    ...jd5Results,
    ...xd5Results,
    ...cd5Results,
    ...wd5Results,
    ...fd5Results,
    ...vd5Results,
    ...yd5Results,
    ...zd5Results,
    ...wd5AltResults,
    ...dd5Results
  ];
}

module.exports = aggregateAsyncDataWithAbort;
