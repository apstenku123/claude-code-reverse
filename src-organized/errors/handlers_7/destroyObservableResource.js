/**
 * Safely destroys an observable resource, handling errors and cleaning up state.
 *
 * @param {object} observableResource - The resource object to destroy. Must be a valid observable and not already destroyed.
 * @param {any} error - Optional error to emit or pass to the destroy method.
 * @returns {void}
 */
function destroyObservableResource(observableResource, error) {
  // Return early if the resource is null, not an observable, or already destroyed
  if (
    observableResource == null ||
    !isNodeStreamLike(observableResource) ||
    isObservableDestroyed(observableResource)
  ) {
    return;
  }

  // If the resource has a destroy method, call isBlobOrFileLikeObject
  if (typeof observableResource.destroy === "function") {
    // If the resource is an instance of IY6, clear its socket property
    if (
      Object.getPrototypeOf(observableResource).constructor === IY6
    ) {
      observableResource.socket = null;
    }
    observableResource.destroy(error);
  } else if (error) {
    // If no destroy method but an error is provided, emit the error asynchronously
    queueMicrotask(() => {
      observableResource.emit("error", error);
    });
  }

  // Mark the resource as destroyed if not already marked
  if (observableResource.destroyed !== true) {
    observableResource[Nb0] = true;
  }
}

module.exports = destroyObservableResource;