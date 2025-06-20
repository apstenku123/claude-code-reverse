/**
 * Collects and aggregates various envelope-related data by executing multiple asynchronous operations in parallel.
 * Applies an abort controller with a 1-second timeout to all operations for safety.
 *
 * @param {object} sourceObservable - Optional source observable or identifier for envelope data.
 * @param {object} config - Configuration object for the operations, will be extended with an AbortController.
 * @param {object} subscription - Subscription or context object for certain operations.
 * @param {object} inputData - Additional input data for certain operations.
 * @returns {Promise<Array>} - Resolves to a single array containing all aggregated results from the parallel operations.
 */
async function collectAndAggregateEnvelopeData(sourceObservable, config, subscription, inputData) {
  // Create an AbortController to allow aborting all async operations after 1 second
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
  }, 1000);

  // Extend the config with the abort controller
  const configWithAbort = {
    ...config,
    abortController
  };

  // Prepare all async operations to run in parallel
  const [
    recentInputEntries, // createCompatibleVersionChecker: aggregateRecentInputEntries
    activityIfNotFinished, // processCssDeclarations: addActivityIfNotFinished
    envelopeData, // W: getChangedWatchedFiles
    droppedEnvelopeItems, // F: recordDroppedEnvelopeItems
    serializedEnvelope, // streamAsyncIterableToWritable: sendSerializedEnvelope
    envelopeValidation, // X: collectMissingNestedMemoryAttachments
    envelopeMetadata, // C: YD5
    additionalInputData, // renderToolUseConfirmationDialog: extractQueuedPromptCommands
    envelopeProcessingResult, // sendHttpRequestOverSocket: getNewDiagnosticsReport
    envelopeDiagnostics // createDebouncedFunction: DD5
  ] = await Promise.all([
    // Only run these if sourceObservable is provided, otherwise resolve to empty array
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

  // Combine all results into a single array and return
  return [
    ...recentInputEntries,
    ...activityIfNotFinished,
    ...envelopeData,
    ...droppedEnvelopeItems,
    ...serializedEnvelope,
    ...envelopeValidation,
    ...envelopeMetadata,
    ...additionalInputData,
    ...envelopeProcessingResult,
    ...envelopeDiagnostics
  ];
}

module.exports = collectAndAggregateEnvelopeData;