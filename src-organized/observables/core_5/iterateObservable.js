/**
 * Iterates over the provided observable using the specified configuration.
 *
 * @param {Observable} sourceObservable - The observable to be iterated over.
 * @param {Object} [config={}] - Optional configuration object for iteration.
 * @returns {any} The result of the iteration process, as defined by Bz'createInteractionAccessor iterate method.
 */
function iterateObservable(sourceObservable, config = {}) {
  // Create a new Bz instance with the observable and configuration, then start iteration
  return new Bz(sourceObservable, config).iterate();
}

module.exports = iterateObservable;