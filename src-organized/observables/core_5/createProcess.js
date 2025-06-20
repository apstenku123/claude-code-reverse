/**
 * Factory function to create a process configuration object.
 *
 * If the provided sourceObservable is an instance of Ry4, returns an object containing:
 *   - stdout: the sourceObservable itself
 *   - stdin: the current process.stdin stream
 * Otherwise, returns the sourceObservable as-is.
 *
 * @param {object} [sourceObservable={}] - The object to be processed, which may be an instance of Ry4 or a configuration object.
 * @returns {object} If sourceObservable is an instance of Ry4, returns an object with stdout and stdin properties; otherwise, returns sourceObservable unchanged.
 */
const createProcess = (sourceObservable = {}) => {
  // Check if the provided object is an instance of Ry4
  if (sourceObservable instanceof Ry4) {
    return {
      stdout: sourceObservable, // The observable to use as stdout
      stdin: process.stdin      // Use the current process'createInteractionAccessor stdin
    };
  }
  // If not an Ry4 instance, return the object as-is
  return sourceObservable;
};

module.exports = createProcess;
