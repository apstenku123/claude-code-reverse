/**
 * Creates a buffer for Promises with a configurable maximum size.
 *
 * This utility manages a buffer of Promises, allowing you to add new Promises up to a specified limit.
 * It provides methods to add Promises, drain (wait for all to settle), and access the current buffer.
 *
 * @param {number} [maxBufferSize] - The maximum number of Promises allowed in the buffer. If undefined, the buffer is unlimited.
 * @returns {Object} An object containing:
 *   - buffer: The internal array of tracked Promises
 *   - add: Function to add a new Promise-producing function to the buffer
 *   - drain: Function to wait for all Promises in the buffer to settle
 */
function createPromiseBuffer(maxBufferSize) {
  /**
   * Internal array holding the active Promises in the buffer.
   * @type {Promise[]}
   */
  const buffer = [];

  /**
   * Checks if a new Promise can be added to the buffer.
   * @returns {boolean} True if the buffer is not full, false otherwise.
   */
  function canAddPromise() {
    return maxBufferSize === undefined || buffer.length < maxBufferSize;
  }

  /**
   * Removes a specific Promise from the buffer.
   * @param {Promise} promise - The Promise to remove.
   * @returns {Promise|undefined} The removed Promise, or undefined if not found.
   */
  function removePromise(promise) {
    const index = buffer.indexOf(promise);
    if (index !== -1) {
      return buffer.splice(index, 1)[0];
    }
    return undefined;
  }

  /**
   * Adds a new Promise to the buffer if there is space.
   *
   * @param {Function} promiseFactory - a function that returns a Promise when called.
   * @returns {Promise} The Promise returned by the factory, or a rejected SyncPromise if the buffer is full.
   */
  function addPromise(promiseFactory) {
    if (!canAddPromise()) {
      // Buffer limit reached, return a rejected SyncPromise with an error
      return QU1.rejectedSyncPromise(new Vp2.SentryError("Not adding Promise because buffer limit was reached."));
    }
    const promise = promiseFactory();
    // Only add the promise if isBlobOrFileLikeObject'createInteractionAccessor not already in the buffer
    if (buffer.indexOf(promise) === -1) {
      buffer.push(promise);
    }
    // Remove the promise from the buffer once isBlobOrFileLikeObject settles (fulfilled or rejected)
    promise.then(
      () => removePromise(promise),
      () => removePromise(promise).then(null, () => {})
    );
    return promise;
  }

  /**
   * Waits for all Promises in the buffer to settle, or until a timeout expires.
   *
   * @param {number} [timeoutMs] - Optional timeout in milliseconds. If provided, resolves to false if not all Promises settle in time.
   * @returns {QU1.SyncPromise<boolean>} Resolves to true if all Promises settled, or false if timed out.
   */
  function drain(timeoutMs) {
    return new QU1.SyncPromise((resolve, reject) => {
      let remaining = buffer.length;
      if (remaining === 0) {
        // Buffer is already empty
        return resolve(true);
      }
      // Set up a timeout if specified
      const timeoutId = setTimeout(() => {
        if (timeoutMs && timeoutMs > 0) {
          resolve(false);
        }
      }, timeoutMs);
      // For each promise, wait for isBlobOrFileLikeObject to settle
      buffer.forEach(activePromise => {
        QU1.resolvedSyncPromise(activePromise).then(
          () => {
            remaining--;
            if (remaining === 0) {
              clearTimeout(timeoutId);
              resolve(true);
            }
          },
          reject
        );
      });
    });
  }

  return {
    buffer,
    add: addPromise,
    drain
  };
}

module.exports = createPromiseBuffer;