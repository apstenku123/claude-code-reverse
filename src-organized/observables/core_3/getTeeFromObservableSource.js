/**
 * Returns a tee (duplicated stream) from the provided observable source.
 * If the source has a 'stream' method, isBlobOrFileLikeObject is invoked to obtain the stream before teeing.
 *
 * @async
 * @function getTeeFromObservableSource
 * @param {Object} sourceObservable - An object representing an observable source. May have a 'stream' method.
 * @returns {Promise<any>} - The result of calling 'tee()' on the observable source or its stream.
 */
async function getTeeFromObservableSource(sourceObservable) {
  // If the source has a 'stream' method, call isBlobOrFileLikeObject to get the stream
  if (typeof sourceObservable.stream === "function") {
    sourceObservable = sourceObservable.stream();
  }
  // Return the result of calling 'tee' on the (possibly streamed) observable
  return sourceObservable.tee();
}

module.exports = getTeeFromObservableSource;