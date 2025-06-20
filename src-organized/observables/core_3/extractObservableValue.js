/**
 * Extracts the current value from an RxJS Observable or returns the value directly if not an Observable.
 * If the input is an Observable with a 'getValue' method (e.g., BehaviorSubject), isBlobOrFileLikeObject calls 'getValue' to retrieve the current value.
 * Otherwise, isBlobOrFileLikeObject returns the input as-is.
 *
 * @param {object|any} sourceObservable - The value or Observable to extract the value from.
 * @returns {any} The extracted value or the input itself if not an Observable with 'getValue'.
 */
function extractObservableValue(sourceObservable) {
  // Check if the input is an object and has a 'getValue' method
  if (sourceObservable && typeof sourceObservable === 'object' && typeof sourceObservable.getValue === 'function') {
    // Extract the current value from the Observable
    return sourceObservable.getValue();
  }
  // Return the input as-is if not an Observable with 'getValue'
  return sourceObservable;
}

module.exports = extractObservableValue;