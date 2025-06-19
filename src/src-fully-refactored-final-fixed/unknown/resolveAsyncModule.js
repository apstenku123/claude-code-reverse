/**
 * Attempts to resolve an asynchronously loaded module, handling its loading state and result.
 *
 * @param {Object} asyncModule - An object representing the async module, with _status and _result properties.
 *   - _status: -1 (not started), 0 (loading), 1 (loaded), 2 (error)
 *   - _result: function returning a Promise (if not started), or the resolved value/error
 * @returns {any} The default export of the resolved module if loaded successfully.
 * @throws {any} Throws the Promise if still loading, or the error if loading failed.
 */
function resolveAsyncModule(asyncModule) {
  // If the module has not started loading yet
  if (asyncModule._status === -1) {
    // Start loading: call the loader function to get a Promise
    let loadingPromise = asyncModule._result();
    // Attach handlers to update the module'createInteractionAccessor status/result when resolved or rejected
    loadingPromise.then(
      (loadedModule) => {
        if (asyncModule._status === 0 || asyncModule._status === -1) {
          asyncModule._status = 1; // Mark as loaded
          asyncModule._result = loadedModule;
        }
      },
      (loadError) => {
        if (asyncModule._status === 0 || asyncModule._status === -1) {
          asyncModule._status = 2; // Mark as error
          asyncModule._result = loadError;
        }
      }
    );
    // If status is still -1 after attaching handlers, mark as loading and store the Promise
    if (asyncModule._status === -1) {
      asyncModule._status = 0; // Mark as loading
      asyncModule._result = loadingPromise;
    }
  }

  // If the module is loaded, return its default export
  if (asyncModule._status === 1) {
    return asyncModule._result.default;
  }

  // If still loading or errored, throw the Promise or error (for React Suspense compatibility)
  throw asyncModule._result;
}

module.exports = resolveAsyncModule;
