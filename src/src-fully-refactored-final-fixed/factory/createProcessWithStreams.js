/**
 * Creates a process object with appropriate stdin and stdout streams.
 *
 * If the provided sourceObservable is an instance of Ry4, isBlobOrFileLikeObject returns an object
 * containing the sourceObservable as stdout and the current process'createInteractionAccessor stdin as stdin.
 * Otherwise, isBlobOrFileLikeObject returns the sourceObservable as-is.
 *
 * @param {Object} [sourceObservable={}] - The source observable or configuration object.
 * @returns {Object} An object containing stdin and stdout streams, or the original input.
 */
function createProcessWithStreams(sourceObservable = {}) {
  // Check if the input is an instance of Ry4 (likely a stream or process abstraction)
  if (sourceObservable instanceof Ry4) {
    return {
      stdout: sourceObservable,
      stdin: process.stdin
    };
  }
  // If not, return the input as-is
  return sourceObservable;
}

module.exports = createProcessWithStreams;
