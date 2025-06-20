/**
 * Processes interaction entries through a pipeline, applies a transformation, and optionally maps the result using a provided function.
 *
 * @param {Function} processInteractionEntries - Function to process an array of interaction entries.
 * @param {Function} [resultMapper] - Optional function to map the final result (can handle one or many arguments).
 * @returns {Observable} Observable that emits the processed and optionally mapped results.
 */
function processInteractionEntriesPipeline(processInteractionEntries, resultMapper) {
  return WP9.pipe(
    JP9.toArray(), // Collect all emitted values into an array
    FP9.mergeMap(function (interactionEntriesArray) {
      // Process the collected interaction entries
      return processInteractionEntries(interactionEntriesArray);
    }),
    // If a resultMapper is provided, map the result; otherwise, use identity
    resultMapper ? YP9.mapOneOrManyArgs(resultMapper) : DP9.identity
  );
}

module.exports = processInteractionEntriesPipeline;