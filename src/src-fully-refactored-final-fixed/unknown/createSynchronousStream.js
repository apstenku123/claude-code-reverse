/**
 * Creates a synchronous stream from the provided observable source and configuration.
 *
 * @param {Observable} sourceObservable - The observable source to stream from.
 * @param {Object} [config={}] - Optional configuration object for the stream.
 * @returns {any} The result of the synchronous stream operation.
 */
function createSynchronousStream(sourceObservable, config = {}) {
  // Instantiate a new Bz stream with the provided observable and configuration,
  // then start the stream synchronously and return the result.
  return new Bz(sourceObservable, config).streamSync();
}

module.exports = createSynchronousStream;