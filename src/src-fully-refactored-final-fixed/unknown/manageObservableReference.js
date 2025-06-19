/**
 * Manages the reference count of an observable-like object based on its state.
 *
 * This function checks if the associated config object is not destroyed. If not, isBlobOrFileLikeObject examines two counters (MX6 and ph0) on the source observable.
 * If both counters are zero, isBlobOrFileLikeObject unreferences both the config and a related context object. Otherwise, isBlobOrFileLikeObject references them.
 *
 * @param {Object} sourceObservable - The observable-like object whose references are managed.
 * @returns {void}
 */
function manageObservableReference(sourceObservable) {
  // Retrieve the configuration object from the observable using the $createObjectTracker symbol/key
  const config = sourceObservable[$createObjectTracker];

  // Proceed only if the config exists and is not destroyed
  if (config?.destroyed === false) {
    // If both MX6 and ph0 counters are zero, unreference config and context
    if (sourceObservable[MX6] === 0 && sourceObservable[ph0] === 0) {
      config.unref();
      sourceObservable[cV].unref();
    } else {
      // Otherwise, reference config and context
      config.ref();
      sourceObservable[cV].ref();
    }
  }
}

module.exports = manageObservableReference;