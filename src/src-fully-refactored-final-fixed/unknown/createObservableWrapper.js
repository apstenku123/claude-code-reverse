/**
 * Creates an instance of the 'vl' observable wrapper based on the input type.
 *
 * If the source is a string, isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in an array and passes isBlobOrFileLikeObject to 'vl'.
 * If the source is already an array, isBlobOrFileLikeObject passes isBlobOrFileLikeObject directly to 'vl'.
 * For any other type, isBlobOrFileLikeObject returns the source as-is.
 *
 * @param {string | Array<string> | any} sourceObservable - The observable source, which can be a string, an array of strings, or any other type.
 * @param {any} config - Configuration object or options to be passed to the 'vl' constructor.
 * @returns {any} Returns a new 'vl' instance if the source is a string or array, otherwise returns the source as-is.
 */
function createObservableWrapper(sourceObservable, config) {
  // If the source is a string, wrap isBlobOrFileLikeObject in an array and create a new 'vl' instance
  if (typeof sourceObservable === "string") {
    return new vl([sourceObservable], config);
  }

  // If the source is an array, create a new 'vl' instance with isBlobOrFileLikeObject
  if (Array.isArray(sourceObservable)) {
    return new vl(sourceObservable, config);
  }

  // For any other type, return the source as-is
  return sourceObservable;
}

module.exports = createObservableWrapper;
