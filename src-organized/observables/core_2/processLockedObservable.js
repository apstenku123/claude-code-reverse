/**
 * Processes an observable with a lock and returns the result.
 *
 * This function applies a locking mechanism to the provided observable (sourceObservable)
 * using the specified configuration (lockConfig). It first locks the observable using
 * the lock function, then processes the locked observable and returns the final result.
 *
 * @async
 * @param {Observable} sourceObservable - The observable to be locked and processed.
 * @param {Object} lockConfig - Configuration options for the locking mechanism.
 * @returns {Promise<any>} The result of processing the locked observable.
 */
async function processLockedObservable(sourceObservable, lockConfig) {
  // Apply the lock to the observable using the provided configuration
  const lockedObservable = await U81(qv.lock)(sourceObservable, lockConfig);
  // Process the locked observable and return the result
  return U81(lockedObservable);
}

module.exports = processLockedObservable;
