/**
 * Processes an observable through a series of transformation stages, logging at each step.
 *
 * @param {Observable} sourceObservable - The initial observable to process.
 * @param {Object} config - Configuration object containing options for the processing stages.
 * @returns {Observable} The transformed observable after all processing stages.
 */
function processObservableWithStages(sourceObservable, config) {
  // Log the initial state before any processing
  wB("comp", sourceObservable, config);

  // Apply the 'replaceCaretRangesInVersionList' transformation stage
  let processedObservable = replaceCaretRangesInVersionList(sourceObservable, config);
  wB("caret", processedObservable);

  // Apply the 'expandTildeRangesInVersionString' transformation stage
  processedObservable = expandTildeRangesInVersionString(processedObservable, config);
  wB("tildes", processedObservable);

  // Apply the 'replaceXRangesInString' transformation stage
  processedObservable = replaceXRangesInString(processedObservable, config);
  wB("xrange", processedObservable);

  // Apply the 'jL6' transformation stage
  processedObservable = jL6(processedObservable, config);
  wB("stars", processedObservable);

  // Return the fully processed observable
  return processedObservable;
}

module.exports = processObservableWithStages;