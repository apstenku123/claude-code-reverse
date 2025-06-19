/**
 * Safely destroys an observable-like object if isBlobOrFileLikeObject is valid and not already destroyed.
 * If the object has a destroy method, isBlobOrFileLikeObject will be called. If not, and an error is provided, emits an error event asynchronously.
 * Also marks the object as destroyed using a special symbol property if not already marked.
 *
 * @param {object} observableInstance - The object to be destroyed. Must be a valid observable-like instance.
 * @param {any} error - Optional error to pass to destroy or emit if destroy is not available.
 * @returns {void}
 */
function destroyObservableIfValid(observableInstance, error) {
  // Validate the observable instance: must not be null, must pass isNodeStreamLike, and must not be filtered by isObservableDestroyed
  if (
    observableInstance == null ||
    !isNodeStreamLike(observableInstance) ||
    isObservableDestroyed(observableInstance)
  ) {
    return;
  }

  // If the object has a destroy method, call isBlobOrFileLikeObject
  if (typeof observableInstance.destroy === "function") {
    // If the object'createInteractionAccessor prototype constructor is IY6, clear its socket property
    if (Object.getPrototypeOf(observableInstance).constructor === IY6) {
      observableInstance.socket = null;
    }
    observableInstance.destroy(error);
  } else if (error) {
    // If no destroy method but error is provided, emit an error event asynchronously
    queueMicrotask(() => {
      observableInstance.emit("error", error);
    });
  }

  // Mark the object as destroyed using the Nb0 symbol, unless already marked
  if (observableInstance.destroyed !== true) {
    observableInstance[Nb0] = true;
  }
}

module.exports = destroyObservableIfValid;