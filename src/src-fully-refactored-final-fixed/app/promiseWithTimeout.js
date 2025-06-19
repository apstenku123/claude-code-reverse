/**
 * Returns a promise that resolves or rejects with the result of the given promise,
 * but will reject with a timeout error if the given timeout (in milliseconds) elapses first.
 *
 * @param {Promise<any>} promise - The promise to race against the timeout.
 * @param {number} timeoutMs - The timeout duration in milliseconds.
 * @returns {Promise<any>} Resolves or rejects with the result of the input promise, or rejects with a timeout error if the timeout elapses first.
 */
function promiseWithTimeout(promise, timeoutMs) {
  let timeoutId;
  // Create a promise that rejects after timeoutMs milliseconds
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new NG1("Operation timed out."));
    }, timeoutMs);
  });

  // Race the input promise against the timeout promise
  return Promise.race([promise, timeoutPromise])
    .then(
      result => {
        // Clear the timeout if the input promise settles first
        clearTimeout(timeoutId);
        return result;
      },
      error => {
        // Clear the timeout if the input promise rejects first
        clearTimeout(timeoutId);
        throw error;
      }
    );
}

module.exports = promiseWithTimeout;