/**
 * Processes an observable source with a configuration and subscription, invoking a callback upon completion or error.
 *
 * This function initializes processing state, iterates through the observable source using the provided configuration,
 * and invokes the final callback with either an error or the accumulated results. It ensures that the callback is called
 * exactly once, either upon error or after all items have been processed.
 *
 * @param {Object} sourceObservable - The observable source to process.
 * @param {Object} config - Configuration options for processing the observable.
 * @param {Object} subscription - Subscription or context object for the observable.
 * @param {Function} finalCallback - Callback to invoke upon completion or error. Signature: (error, results) => void
 * @returns {Function} - a bound function to be used as a completion handler, with the processing state and callback.
 */
function processObservableWithCallback(sourceObservable, config, subscription, finalCallback) {
  // Initialize processing state for the observable
  const processingState = ZC9(sourceObservable, subscription);

  /**
   * Recursive handler for processing each item in the observable.
   * @param {Error|null} error - Error encountered during processing, if any.
   * @param {any} result - The result of processing the current item.
   */
  function handleItemProcessing(error, result) {
    if (error) {
      // If an error occurred, immediately invoke the final callback with the error
      finalCallback(error, result);
      return;
    }
    // Move to the next item
    processingState.index++;
    // Determine the list to process (keyedList or the sourceObservable itself)
    const itemsList = processingState.keyedList || sourceObservable;
    // If there are more items to process, continue recursively
    if (processingState.index < itemsList.length) {
      BFA(sourceObservable, config, processingState, handleItemProcessing);
      return;
    }
    // All items processed successfully; invoke the final callback with results
    finalCallback(null, processingState.results);
  }

  // Start processing the observable
  BFA(sourceObservable, config, processingState, handleItemProcessing);

  // Return a bound completion handler for external use
  return DC9.bind(processingState, finalCallback);
}

module.exports = processObservableWithCallback;
