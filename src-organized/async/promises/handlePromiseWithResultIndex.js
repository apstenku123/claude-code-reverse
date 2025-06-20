/**
 * Handles the resolution or rejection of a promise, storing the result at a specific index in a results array.
 * Resolves or rejects a parent promise based on completion state and error occurrence.
 *
 * @param {any} promiseInput - The input to be resolved as a promise.
 * @param {number} resultIndex - The index in the results array where the resolved value should be stored.
 * @returns {void}
 */
function handlePromiseWithResultIndex(promiseInput, resultIndex) {
  // Attempt to resolve the input as a promise
  promiseHandler.resolve(promiseInput).then(onPromiseResolved, function onPromiseRejected(error) {
    // If not already handled, mark as handled and reject the parent promise with the error
    if (!isSettled) {
      isSettled = true;
      parentPromiseHandler.reject(parentPromise, error);
    }
  });

  /**
   * Handles the successful resolution of the promise.
   * Stores the result at the specified index and checks if all promises are resolved.
   * @param {any} resolvedValue - The resolved value from the promise.
   */
  function onPromiseResolved(resolvedValue) {
    resultsArray[resultIndex] = resolvedValue;
    completedCount++;
    // If all promises are resolved and not already handled, resolve the parent promise
    if (completedCount === totalPromises && !isSettled) {
      isSettled = true;
      parentPromiseHandler.resolve(parentPromise, resultsArray);
    }
  }
}

module.exports = handlePromiseWithResultIndex;