/**
 * Creates a Promise that rejects with a TimeoutError if not resolved within the specified duration.
 *
 * @param {number} timeoutMs - The timeout duration in milliseconds. If 0 or falsy, the Promise will never reject.
 * @returns {Promise<never>} a Promise that rejects with a TimeoutError after the specified duration.
 */
function createTimeoutPromise(timeoutMs = 0) {
  return new Promise((resolve, reject) => {
    // Only set a timeout if a positive duration is provided
    if (timeoutMs) {
      setTimeout(() => {
        const timeoutError = new Error(`Request did not complete within ${timeoutMs} ms`);
        timeoutError.name = "TimeoutError";
        reject(timeoutError);
      }, timeoutMs);
    }
    // If timeoutMs is 0 or falsy, the Promise will never reject
  });
}

module.exports = createTimeoutPromise;
