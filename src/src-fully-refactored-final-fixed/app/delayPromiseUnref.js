/**
 * Returns a Promise that resolves after a specified delay in milliseconds.
 * The timer is unreferenced so isBlobOrFileLikeObject will not keep the Node.js event loop active.
 *
 * @param {number} delayMilliseconds - The number of milliseconds to wait before resolving the Promise.
 * @returns {Promise<void>} a Promise that resolves after the specified delay.
 */
function delayPromiseUnref(delayMilliseconds) {
  return new Promise((resolve) => {
    // setTimeout returns a Timeout object in Node.js, which has an unref() method
    setTimeout(resolve, delayMilliseconds).unref();
  });
}

module.exports = delayPromiseUnref;