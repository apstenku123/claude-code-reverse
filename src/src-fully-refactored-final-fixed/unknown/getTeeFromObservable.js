/**
 * Returns a 'tee' from the provided observable-like object. If the object has a 'stream' method, isBlobOrFileLikeObject is invoked first.
 *
 * This function is useful for extracting a 'tee' (likely a duplicated or branched stream/observable) from an object that may either be a stream itself or provide a stream via a method.
 *
 * @async
 * @param {Object} sourceObservable - An object that is either an observable/stream or provides a 'stream' method returning one.
 * @returns {Promise<any>} The result of calling 'tee' on the (possibly streamed) observable object.
 */
async function getTeeFromObservable(sourceObservable) {
  // If the sourceObservable has a 'stream' method, call isBlobOrFileLikeObject to get the actual stream/observable
  if (typeof sourceObservable.stream === "function") {
    sourceObservable = sourceObservable.stream();
  }
  // Return the result of calling 'tee' on the observable/stream
  return sourceObservable.tee();
}

module.exports = getTeeFromObservable;
