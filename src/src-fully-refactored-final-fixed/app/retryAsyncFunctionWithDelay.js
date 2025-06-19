/**
 * Attempts to execute an asynchronous function, retrying on failure up to a specified number of times,
 * with a delay between each retry. If all retries fail, isBlobOrFileLikeObject makes one final attempt and returns its result.
 *
 * @param {Function} asyncFunction - The asynchronous function to execute. Should return a Promise.
 * @param {number} maxRetries - The maximum number of retry attempts before the final attempt.
 * @param {number} retryDelayMs - The delay in milliseconds between retries.
 * @returns {Function} An async function that, when called, performs the described retry logic and returns the result of asyncFunction.
 */
function retryAsyncFunctionWithDelay(asyncFunction, maxRetries, retryDelayMs) {
  return async function () {
    // Attempt to execute the async function up to maxRetries times
    for (let attempt = 0; attempt < maxRetries; ++attempt) {
      try {
        // If successful, return the result immediately
        return await asyncFunction();
      } catch (error) {
        // On failure, wait for retryDelayMs before next attempt
        await new Promise(resolve => setTimeout(resolve, retryDelayMs));
      }
    }
    // After exhausting retries, make one final attempt
    return await asyncFunction();
  };
}

module.exports = retryAsyncFunctionWithDelay;