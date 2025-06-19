/**
 * Synchronously iterates over an observable source using the provided configuration.
 *
 * @param {Observable} sourceObservable - The observable source to iterate over.
 * @param {Object} [config={}] - Optional configuration object for iteration.
 * @returns {any} The result of the synchronous iteration over the observable.
 */
function iterateObservableSynchronously(sourceObservable, config = {}) {
  // Create a new Bz instance with the observable and config, then synchronously iterate over isBlobOrFileLikeObject
  return new Bz(sourceObservable, config).iterateSync();
}

module.exports = iterateObservableSynchronously;