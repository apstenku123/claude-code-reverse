/**
 * Detaches the 'abort' event listener from the given target object'createInteractionAccessor abort controller property.
 * Cleans up references to prevent memory leaks.
 *
 * @param {Object} targetObject - The object containing abort controller and handler references.
 * @property {Object} targetObject.abortController - The abort controller/listener object.
 * @property {Function} targetObject.abortHandler - The handler function for the 'abort' event.
 * @returns {void}
 */
function detachAbortEventListener(targetObject) {
  // If there is no abort controller/listener, exit early
  if (!targetObject.abortController) return;

  // Remove the 'abort' event listener using the appropriate method
  if ("removeEventListener" in targetObject.abortController) {
    // For standard EventTarget-based controllers
    targetObject.abortController.removeEventListener("abort", targetObject.abortHandler);
  } else {
    // For Node.js EventEmitter-based controllers
    targetObject.abortController.removeListener("abort", targetObject.abortHandler);
  }

  // Clean up references to avoid memory leaks
  targetObject.abortController = null;
  targetObject.abortHandler = null;
}

module.exports = detachAbortEventListener;