/**
 * Processes a list of interaction entries, applying a callback for each entry, and manages asynchronous job completion.
 *
 * @param {Array} interactionEntries - The array of interaction entries to process.
 * @param {Object} config - Configuration object for processing each entry.
 * @param {Function} finalCallback - Callback to be called when processing is complete or an error occurs. Receives (error, results).
 * @returns {Function} - a function bound to the current processing context, which can be called with the final callback.
 */
function processInteractionEntriesWithCallback(interactionEntries, config, finalCallback) {
  // Initialize processing context using QC9, which sets up tracking for jobs and results
  const processingContext = QC9(interactionEntries);

  // Loop through each entry in the list (or a keyed list if present)
  while (processingContext.index < (processingContext.keyedList || interactionEntries).length) {
    // Process the current entry using BC9, passing in a callback for job completion
    BC9(interactionEntries, config, processingContext, function (error, result) {
      if (error) {
        // If an error occurs, immediately call the final callback with the error and result
        finalCallback(error, result);
        return;
      }
      // If all jobs are complete (no more pending jobs), call the final callback with results
      if (Object.keys(processingContext.jobs).length === 0) {
        finalCallback(null, processingContext.results);
        return;
      }
    });
    // Move to the next entry
    processingContext.index++;
  }
  // Return a function bound to the current processing context and final callback
  return IC9.bind(processingContext, finalCallback);
}

module.exports = processInteractionEntriesWithCallback;