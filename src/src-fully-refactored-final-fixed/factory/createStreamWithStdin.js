/**
 * Factory function that returns a standardized stream object.
 *
 * If the provided sourceObservable is an instance of Ry4 (a custom stream class),
 * isBlobOrFileLikeObject returns an object containing the observable as 'stdout' and the current process'createInteractionAccessor stdin as 'stdin'.
 * Otherwise, isBlobOrFileLikeObject returns the sourceObservable as-is.
 *
 * @param {Object} [sourceObservable={}] - The source stream or configuration object.
 * @returns {Object} An object containing 'stdout' and 'stdin' if sourceObservable is an Ry4 instance, otherwise the original object.
 */
const createStreamWithStdin = (sourceObservable = {}) => {
  // Check if the provided object is an instance of Ry4 (custom stream class)
  if (sourceObservable instanceof Ry4) {
    return {
      stdout: sourceObservable, // The provided stream
      stdin: process.stdin      // The process'createInteractionAccessor standard input stream
    };
  }
  // If not an Ry4 instance, return the object as-is
  return sourceObservable;
};

module.exports = createStreamWithStdin;