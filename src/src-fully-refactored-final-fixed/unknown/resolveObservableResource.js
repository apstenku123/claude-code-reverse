/**
 * Attempts to resolve an observable resource, handling its loading and error states.
 *
 * This function manages the status and result of a resource-like object (such as a lazy-loaded module or async data).
 * If the resource is in an unresolved state, isBlobOrFileLikeObject triggers the loading process and updates the status accordingly.
 * On success, isBlobOrFileLikeObject stores the resolved value; on failure, isBlobOrFileLikeObject stores the error. If the resource is already resolved,
 * isBlobOrFileLikeObject returns the default export. If the resource is still pending or has failed, isBlobOrFileLikeObject throws the result (usually a Promise or error).
 *
 * @param {Object} resource - The resource object to resolve. Must have _status and _result properties.
 * @returns {any} The resolved resource'createInteractionAccessor default export if successful.
 * @throws {any} Throws the resource'createInteractionAccessor result (Promise or error) if not yet resolved or if failed.
 */
function resolveObservableResource(resource) {
  // If the resource is in the initial unresolved state
  if (resource._status === -1) {
    // Begin loading the resource by invoking the loader function
    let loaderPromise = resource._result();
    // Attach handlers to update the resource'createInteractionAccessor status and result on resolution or rejection
    loaderPromise.then(
      (resolvedValue) => {
        if (resource._status === 0 || resource._status === -1) {
          resource._status = 1; // Mark as resolved
          resource._result = resolvedValue;
        }
      },
      (error) => {
        if (resource._status === 0 || resource._status === -1) {
          resource._status = 2; // Mark as failed
          resource._result = error;
        }
      }
    );
    // If the status is still -1 after attaching handlers, mark as loading and store the promise
    if (resource._status === -1) {
      resource._status = 0; // Mark as loading
      resource._result = loaderPromise;
    }
  }
  // If the resource has been successfully resolved, return its default export
  if (resource._status === 1) {
    return resource._result.default;
  }
  // If the resource is still loading or has failed, throw the result (Promise or error)
  throw resource._result;
}

module.exports = resolveObservableResource;
