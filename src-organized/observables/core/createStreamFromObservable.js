/**
 * Creates a stream from the provided observable source using the given configuration.
 *
 * @param {Observable} sourceObservable - The observable source to create the stream from.
 * @param {Object} [config={}] - Optional configuration object for the stream.
 * @returns {Stream} The resulting stream created from the observable.
 */
function createStreamFromObservable(sourceObservable, config = {}) {
  // Instantiate a new Bz object with the observable source and configuration
  // and return its stream representation
  return new Bz(sourceObservable, config).stream();
}

module.exports = createStreamFromObservable;