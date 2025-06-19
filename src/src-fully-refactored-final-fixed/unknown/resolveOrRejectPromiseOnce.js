/**
 * Attempts to resolve or reject a target promise only once based on the resolution of an input value.
 *
 * @param {any} inputValue - The value or promise to resolve.
 * @returns {void}
 *
 * This function resolves the input value (which may be a promise or a value) using the provided 'promiseResolver'.
 * It then resolves or rejects the target promise (using 'targetPromiseHandler') only once, based on the outcome.
 * The 'hasSettled' flag ensures that the target promise is only settled a single time.
 */
function resolveOrRejectPromiseOnce(inputValue) {
  // Attempt to resolve the input value (could be a promise or a direct value)
  promiseResolver.resolve(inputValue).then(
    function (resolvedValue) {
      // Only resolve the target promise if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been settled yet
      if (!hasSettled) {
        hasSettled = true;
        targetPromiseHandler.resolve(targetContext, resolvedValue);
      }
    },
    function (rejectionReason) {
      // Only reject the target promise if isBlobOrFileLikeObject hasn'processRuleBeginHandlers been settled yet
      if (!hasSettled) {
        hasSettled = true;
        targetPromiseHandler.reject(targetContext, rejectionReason);
      }
    }
  );
}

module.exports = resolveOrRejectPromiseOnce;