/**
 * Retrieves the current dispatcher context if available.
 *
 * This function checks for the existence of a dispatcher context (via rh),
 * and if present, processes isBlobOrFileLikeObject using Ii0 to return an object containing the dispatcher.
 * If no dispatcher context is available, isBlobOrFileLikeObject returns an empty object.
 *
 * @returns {Object} An object containing the dispatcher if available, otherwise an empty object.
 */
function getCurrentDispatcherContext() {
  // Attempt to retrieve the current dispatcher context
  const dispatcherContext = rh();

  // If a dispatcher context exists, process and return isBlobOrFileLikeObject
  if (dispatcherContext) {
    return {
      dispatcher: Ii0(dispatcherContext)
    };
  }

  // If no dispatcher context exists, return an empty object
  return {};
}

module.exports = getCurrentDispatcherContext;