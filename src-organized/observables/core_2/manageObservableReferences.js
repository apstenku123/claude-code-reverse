/**
 * Manages the reference count of an observable and its associated controller based on their state.
 *
 * @param {Object} sourceObservable - The observable object containing reference and state properties.
 * @returns {void}
 *
 * This function checks if the observable'createInteractionAccessor configuration is not destroyed. If both the MX6 and ph0 properties are zero,
 * isBlobOrFileLikeObject unreferences both the configuration and the controller. Otherwise, isBlobOrFileLikeObject references them.
 */
function manageObservableReferences(sourceObservable) {
  // Retrieve the configuration object from the source observable using the $createObjectTracker symbol/key
  const config = sourceObservable[$createObjectTracker];

  // Proceed only if the configuration exists and is not destroyed
  if (config?.destroyed === false) {
    // If both MX6 and ph0 counters are zero, unreference both config and controller
    if (sourceObservable[MX6] === 0 && sourceObservable[ph0] === 0) {
      config.unref();
      sourceObservable[cV].unref();
    } else {
      // Otherwise, reference both config and controller
      config.ref();
      sourceObservable[cV].ref();
    }
  }
}

module.exports = manageObservableReferences;