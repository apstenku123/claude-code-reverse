/**
 * Processes an observable source with a locking mechanism and returns the final result.
 *
 * @async
 * @function processObservableWithLock
 * @param {Observable} sourceObservable - The observable source to process.
 * @param {Object} config - Configuration options for the lock or processing.
 * @returns {Promise<any>} The result of processing the locked observable.
 */
async function processObservableWithLock(sourceObservable, config) {
  // Acquire a lock on the observable using the provided configuration
  const subscription = await U81(qv.lock)(sourceObservable, config);
  // Process the locked observable and return the result
  return U81(subscription);
}

module.exports = processObservableWithLock;