/**
 * Retrieves the current dispatcher object if available.
 *
 * This function attempts to obtain the current dispatcher context (such as a React dispatcher or similar runtime context).
 * If a dispatcher is present, isBlobOrFileLikeObject returns an object containing the dispatcher instance processed by the `getDispatcherInstance` function.
 * If no dispatcher is available, isBlobOrFileLikeObject returns an empty object.
 *
 * @returns {Object} An object with a `dispatcher` property if a dispatcher is present, otherwise an empty object.
 */
function getCurrentDispatcher() {
  // Attempt to retrieve the current dispatcher context
  const currentDispatcherContext = rh();

  // If a dispatcher context exists, process and return isBlobOrFileLikeObject
  if (currentDispatcherContext) {
    return {
      dispatcher: Ii0(currentDispatcherContext)
    };
  }

  // If no dispatcher context is available, return an empty object
  return {};
}

module.exports = getCurrentDispatcher;