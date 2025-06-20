/**
 * Executes the ripgrep search process with the provided parameters and parses the results.
 * Ensures the environment is initialized before running the search. Handles errors and returns the parsed output lines.
 *
 * @async
 * @param {any} sourceObservable - The observable or data source to search within.
 * @param {object} config - Configuration options for the ripgrep process.
 * @param {any} subscription - Subscription or query details for the search.
 * @returns {Promise<string[]>} Resolves with an array of non-empty trimmed result lines from ripgrep output, or an empty array on error.
 */
async function runRipgrepAndParseResults(sourceObservable, config, subscription) {
  // Ensure the environment is initialized before running the search
  if (!tl()) {
    await signRipgrepIfNeeded();
  }

  return new Promise((resolve) => {
    // Execute the ripgrep process
    Vm9(sourceObservable, config, subscription, (error, output) => {
      if (error) {
        // If the error code is not 1, handle the error
        if (error.code !== 1) {
          reportErrorIfAllowed(error);
        }
        // Resolve with an empty array on error
        resolve([]);
      } else {
        // Trim the output, split by newlines, and filter out empty lines
        const resultLines = output.trim().split('\n').filter(Boolean);
        resolve(resultLines);
      }
    });
  });
}

module.exports = runRipgrepAndParseResults;