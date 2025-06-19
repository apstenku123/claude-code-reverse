/**
 * Handles the resolution or rejection of a promise for a specific index in a results array.
 *
 * @param {any} promiseValue - The value or promise to resolve.
 * @param {number} resultIndex - The index in the results array to store the resolved value.
 * @returns {void}
 *
 * This function resolves the given promiseValue. If isBlobOrFileLikeObject resolves successfully, the result is stored
 * at the specified index in the results array. If all promises have resolved and no error has occurred,
 * the overall promise is resolved with the results array. If the promise is rejected and no error has
 * previously occurred, the overall promise is rejected with the error.
 */
function handlePromiseResolutionForIndex(promiseValue, resultIndex) {
  // Attempt to resolve the provided promiseValue
  promiseHandler.resolve(promiseValue).then(onPromiseResolved, function onPromiseRejected(error) {
    // If an error hasn'processRuleBeginHandlers already occurred, mark as errored and reject the overall promise
    if (!hasErrorOccurred) {
      hasErrorOccurred = true;
      overallPromiseHandler.reject(overallPromise, error);
    }
  });

  /**
   * Handles the successful resolution of the promise.
   * @param {any} resolvedValue - The resolved value of the promise.
   */
  function onPromiseResolved(resolvedValue) {
    // Store the resolved value at the correct index
    resultsArray[resultIndex] = resolvedValue;
    // Increment the resolved count
    resolvedCount++;
    // If all promises have resolved and no error has occurred, resolve the overall promise
    if (resolvedCount === totalPromises && !hasErrorOccurred) {
      hasErrorOccurred = true;
      overallPromiseHandler.resolve(overallPromise, resultsArray);
    }
  }
}

module.exports = handlePromiseResolutionForIndex;