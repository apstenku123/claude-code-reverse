/**
 * Handles the resolution or rejection of a promise and stores the result at a specific index in a results array.
 *
 * @param {Promise<any>} promise - The promise to resolve.
 * @param {number} resultIndex - The index in the results array where the resolved value should be stored.
 * @returns {void}
 */
function handlePromiseResultAtIndex(promise, resultIndex) {
  // Attempt to resolve the provided promise
  promise.then(onPromiseResolved, function onPromiseRejected(error) {
    // If not already settled, mark as settled and reject the overall promise
    if (!isSettled) {
      isSettled = true;
      overallPromiseController.reject(overallPromise, error);
    }
  });

  /**
   * Handles the successful resolution of the promise.
   * @param {any} resolvedValue - The value resolved by the promise.
   */
  function onPromiseResolved(resolvedValue) {
    // Store the resolved value at the specified index in the results array
    resultsArray[resultIndex] = resolvedValue;
    // Increment the resolved count
    resolvedCount++;
    // If all promises are resolved and not already settled, resolve the overall promise
    if (resolvedCount === totalPromises && !isSettled) {
      isSettled = true;
      overallPromiseController.resolve(overallPromise, resultsArray);
    }
  }
}

module.exports = handlePromiseResultAtIndex;