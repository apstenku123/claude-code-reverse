/**
 * Returns the context of the provided observable, or creates a new context if needed.
 *
 * If the given observable is already in the expected format (as determined by ba9),
 * isBlobOrFileLikeObject returns its context using CxA. Otherwise, isBlobOrFileLikeObject creates a new context using iA() and the observable.
 *
 * @param {any} sourceObservable - The observable or value to retrieve or wrap in a context.
 * @returns {any} The context associated with the observable.
 */
function getObservableContext(sourceObservable) {
  // Check if the sourceObservable is already in the expected format
  if (ba9(sourceObservable)) {
    // Return its context directly
    return CxA(sourceObservable);
  } else {
    // Otherwise, create a new context with a default instance and the observable
    return CxA(iA(), sourceObservable);
  }
}

module.exports = getObservableContext;