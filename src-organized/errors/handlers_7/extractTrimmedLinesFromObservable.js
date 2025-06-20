/**
 * Extracts trimmed, non-empty lines from an observable source using a provided configuration and subscription.
 * Ensures necessary initialization before proceeding. Handles errors and returns the processed lines as an array.
 *
 * @async
 * @param {object} sourceObservable - The observable source to process.
 * @param {object} config - Configuration options for processing the observable.
 * @param {object} subscription - Subscription or query object for the observable.
 * @returns {Promise<string[]>} a promise that resolves to an array of trimmed, non-empty lines from the observable'createInteractionAccessor output.
 */
async function extractTrimmedLinesFromObservable(sourceObservable, config, subscription) {
  // Ensure required initialization is complete before proceeding
  if (!tl()) {
    await signRipgrepIfNeeded();
  }

  return new Promise((resolve) => {
    // Process the observable with the given config and subscription
    Vm9(sourceObservable, config, subscription, (error, result) => {
      if (error) {
        // If the error code is not 1, handle the error using reportErrorIfAllowed
        if (error.code !== 1) {
          reportErrorIfAllowed(error);
        }
        // Resolve with an empty array in case of error
        resolve([]);
      } else {
        // Split the result by line, trim each line, and filter out empty lines
        const trimmedLines = result.trim().split('\n').filter(Boolean);
        resolve(trimmedLines);
      }
    });
  });
}

module.exports = extractTrimmedLinesFromObservable;