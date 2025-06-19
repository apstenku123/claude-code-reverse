/**
 * Extracts trimmed, non-empty lines from a result provided by Vm9, handling errors as needed.
 *
 * @async
 * @function extractTrimmedNonEmptyLines
 * @param {any} sourceObservable - The source observable or data input for Vm9.
 * @param {any} config - Configuration object or parameters for Vm9.
 * @param {any} subscription - Subscription or context parameter for Vm9.
 * @returns {Promise<string[]>} Resolves to an array of trimmed, non-empty lines from the result, or an empty array on error.
 */
async function extractTrimmedNonEmptyLines(sourceObservable, config, subscription) {
  // Ensure that the environment is initialized before proceeding
  if (!tl()) {
    await signRipgrepIfNeeded();
  }

  // Return a promise that resolves with the processed result
  return new Promise((resolve) => {
    Vm9(sourceObservable, config, subscription, (error, result) => {
      if (error) {
        // If error code is not 1, handle the error using reportErrorIfAllowed
        if (error.code !== 1) {
          reportErrorIfAllowed(error);
        }
        // Resolve with an empty array on error
        resolve([]);
      } else {
        // Split the result into lines, trim, and filter out empty lines
        const trimmedLines = result.trim().split('\n').filter(Boolean);
        resolve(trimmedLines);
      }
    });
  });
}

module.exports = extractTrimmedNonEmptyLines;