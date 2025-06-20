/**
 * Handles the resolution or rejection of a promise and ensures that the result is processed only once.
 *
 * @param {any} inputValue - The value to resolve as a promise.
 * @returns {void}
 *
 * This function resolves the provided inputValue as a promise using the promiseResolver (b.resolve). 
 * It then processes the result by either resolving or rejecting the resultHandler (W) with the given context (contextObject) and the resolved/rejected value.
 * The function ensures that the resultHandler is called only once by checking the hasHandled flag.
 */
function handlePromiseResolution(inputValue) {
  // Ensure that the following external variables are defined in the module'createInteractionAccessor scope:
  // - promiseResolver: an object with a resolve method (e.g., b)
  // - resultHandler: an object with resolve and reject methods (e.g., W)
  // - contextObject: the context to pass to resultHandler (e.g., invokeHandlerWithArguments)
  // - hasHandled: a boolean flag to prevent multiple handling (e.g., h)

  promiseResolver.resolve(inputValue).then(
    function (resolvedValue) {
      // Only handle the result if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been handled yet
      if (!hasHandled) {
        hasHandled = true;
        resultHandler.resolve(contextObject, resolvedValue);
      }
    },
    function (rejectedValue) {
      // Only handle the rejection if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been handled yet
      if (!hasHandled) {
        hasHandled = true;
        resultHandler.reject(contextObject, rejectedValue);
      }
    }
  );
}

module.exports = handlePromiseResolution;