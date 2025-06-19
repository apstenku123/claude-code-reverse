/**
 * Resolves a promise for a given data source and sets the result at the specified key in the result map.
 * Handles both resolve and reject cases, and manages completion state for a batch operation.
 *
 * @param {any} dataSource - The data source or promise to resolve.
 * @param {string|number} resultKey - The key at which to store the resolved value in the result map.
 * @returns {void}
 */
function setDataForKey(dataSource, resultKey) {
  // Attempt to resolve the dataSource promise
  promiseResolver.resolve(dataSource).then(onResolve, function onReject(error) {
    // If not already handled, mark as handled and reject the batch promise
    if (!isCompleted) {
      isCompleted = true;
      batchPromise.reject(batchResult, error);
    }
  });

  /**
   * Handles successful resolution of the dataSource promise.
   * @param {any} resolvedValue - The resolved value from the dataSource.
   */
  function onResolve(resolvedValue) {
    // Store the resolved value at the specified key
    resultMap[resultKey] = resolvedValue;
    // Increment the resolved count and check if all have resolved
    resolvedCount++;
    if (resolvedCount === totalCount && !isCompleted) {
      isCompleted = true;
      batchPromise.resolve(batchResult, resultMap);
    }
  }
}

module.exports = setDataForKey;