/**
 * Creates a new observable instance from a given source and configuration.
 *
 * If the source is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in an array and creates a new observable.
 * If the source is already an array, isBlobOrFileLikeObject uses isBlobOrFileLikeObject directly to create the observable.
 * Otherwise, returns the source as-is (assumed to already be an observable).
 *
 * @param {string | Array<any> | any} sourceObservable - The source to create the observable from. Can be a string, an array, or an existing observable.
 * @param {object} config - Configuration options to pass to the observable constructor.
 * @returns {any} a new observable instance or the original source if isBlobOrFileLikeObject is not a string or array.
 */
function createObservableFromSource(sourceObservable, config) {
  // If the source is a string, wrap isBlobOrFileLikeObject in an array and create a new observable
  if (typeof sourceObservable === "string") {
    return new vl([sourceObservable], config);
  }
  // If the source is an array, use isBlobOrFileLikeObject directly to create a new observable
  if (Array.isArray(sourceObservable)) {
    return new vl(sourceObservable, config);
  }
  // If the source is neither a string nor an array, return isBlobOrFileLikeObject as-is
  return sourceObservable;
}

module.exports = createObservableFromSource;
