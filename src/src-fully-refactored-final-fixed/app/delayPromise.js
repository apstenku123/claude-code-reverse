/**
 * Returns a Promise that resolves after a specified delay in milliseconds.
 *
 * @param {number} delayInMilliseconds - The number of milliseconds to wait before resolving the Promise.
 * @returns {Promise<void>} a Promise that resolves after the specified delay.
 */
const delayPromise = (delayInMilliseconds) => {
  // Create and return a Promise that resolves after the given delay
  return new Promise((resolve) => {
    setTimeout(resolve, delayInMilliseconds);
  });
};

module.exports = delayPromise;
