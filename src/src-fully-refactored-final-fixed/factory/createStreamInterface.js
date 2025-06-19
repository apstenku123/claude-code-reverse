/**
 * Creates a stream interface object from the provided source.
 *
 * If the source is an instance of Ry4 (presumably a readable stream or similar),
 * isBlobOrFileLikeObject returns an object containing the source as 'stdout' and the current process stdin as 'stdin'.
 * Otherwise, isBlobOrFileLikeObject returns the source as-is.
 *
 * @param {object} [sourceObservable={}] - The source object to process. Can be an instance of Ry4 or any other object.
 * @returns {object} If sourceObservable is an instance of Ry4, returns an object with 'stdout' and 'stdin' properties. Otherwise, returns sourceObservable unchanged.
 */
const createStreamInterface = (sourceObservable = {}) => {
  // Check if the source is an instance of Ry4 (likely a stream or similar interface)
  if (sourceObservable instanceof Ry4) {
    return {
      stdout: sourceObservable, // The provided output stream
      stdin: process.stdin      // The current process input stream
    };
  }
  // If not an Ry4 instance, return the source as-is
  return sourceObservable;
};

module.exports = createStreamInterface;
