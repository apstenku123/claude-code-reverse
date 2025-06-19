/**
 * Attempts to execute an asynchronous action multiple times with a delay between retries.
 *
 * @param {Function} asyncAction - The asynchronous function to execute. Should return a Promise.
 * @param {number} maxRetries - The number of times to attempt the action before a final attempt.
 * @param {number} retryDelayMs - The delay in milliseconds between retries.
 * @returns {Function} An async function that, when called, will attempt the action with retries.
 */
function createRetriableAsyncAction(asyncAction, maxRetries, retryDelayMs) {
  return async function () {
    // Attempt the async action up to maxRetries times
    for (let attempt = 0; attempt < maxRetries; ++attempt) {
      try {
        // If successful, return the result immediately
        return await asyncAction();
      } catch (error) {
        // On failure, wait for the specified delay before retrying
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
      }
    }
    // Final attempt after all retries
    return await asyncAction();
  };
}

module.exports = createRetriableAsyncAction;
