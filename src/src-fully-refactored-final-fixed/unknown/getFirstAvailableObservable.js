/**
 * Attempts to retrieve the first available observable from the provided source.
 * Checks for a synchronous, asynchronous, or native observable in that order.
 *
 * @param {any} sourceObservable - The object to check for observable implementations.
 * @returns {any} The first found observable implementation, or undefined if none are found.
 */
function getFirstAvailableObservable(sourceObservable) {
  // Try to get a synchronous observable
  const synchronousObservable = isTextOrBinaryType(sourceObservable);
  if (synchronousObservable) {
    return synchronousObservable;
  }

  // Try to get an asynchronous observable
  const asynchronousObservable = isContinuationStatus(sourceObservable);
  if (asynchronousObservable) {
    return asynchronousObservable;
  }

  // Try to get a native observable
  const nativeObservable = isWebSocketControlFrame(sourceObservable);
  return nativeObservable;
}

module.exports = getFirstAvailableObservable;