/**
 * Throws an AbortError DOMException if the provided signal indicates the operation was aborted.
 *
 * @param {Object} abortSignalWrapper - An object that contains an 'aborted' boolean property, typically an AbortSignal or similar.
 * @throws {DOMException} Throws if abortSignalWrapper.aborted is true.
 */
function throwIfAborted(abortSignalWrapper) {
  // If the operation has been aborted, throw a DOMException with the appropriate message and name
  if (abortSignalWrapper.aborted) {
    throw new DOMException("The operation was aborted.", "AbortError");
  }
}

module.exports = throwIfAborted;
