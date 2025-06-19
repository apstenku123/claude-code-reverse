/**
 * Sets data for a given key by resolving a promise and updating the data store.
 * Handles both successful and failed resolutions, ensuring only the first result is processed.
 *
 * @param {Promise<any>} dataPromise - The promise that resolves to the data to be set.
 * @param {string|number} dataKey - The key/index in the data store where the resolved data should be stored.
 * @returns {void}
 */
function setDataForKey(dataPromise, dataKey) {
  // Attempt to resolve the incoming dataPromise
  promiseHandler.resolve(dataPromise).then(onResolve, function onReject(error) {
    // If not already handled, mark as handled and reject the overall operation
    if (!isSettled) {
      isSettled = true;
      resultHandler.reject(finalResult, error);
    }
  });

  /**
   * Handles successful resolution of the dataPromise.
   * @param {any} resolvedData - The data resolved from the promise.
   */
  function onResolve(resolvedData) {
    // Store the resolved data at the specified key
    dataStore[dataKey] = resolvedData;
    // Increment the count of resolved promises
    resolvedCount++;
    // If all promises are resolved and not already settled, resolve the overall operation
    if (resolvedCount === totalPromises && !isSettled) {
      isSettled = true;
      resultHandler.resolve(finalResult, dataStore);
    }
  }
}

module.exports = setDataForKey;